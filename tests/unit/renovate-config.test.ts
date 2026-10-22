import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

interface PackageRule {
  matchUpdateTypes?: string[]
  groupName?: string
  schedule?: string[]
}

interface RenovateConfig {
  extends?: string[]
  packageRules?: PackageRule[]
  vulnerabilityAlerts?: { schedule?: string[], groupName?: string | null }
}

const config: RenovateConfig = JSON.parse(
  readFileSync(new URL('../../renovate.json', import.meta.url), 'utf8'),
)

const groupRule = config.packageRules?.find(rule => rule.groupName)

describe('renovate config', () => {
  it('keeps the recommended preset', () => {
    expect(config.extends).toContain('config:recommended')
  })

  it('groups only minor and patch updates under one group name', () => {
    expect(groupRule?.groupName).toBeTruthy()
    expect([...(groupRule?.matchUpdateTypes ?? [])].sort()).toEqual(['minor', 'patch'])
  })

  it('leaves major updates ungrouped', () => {
    const groupedRules = config.packageRules?.filter(rule => rule.groupName) ?? []

    expect(groupedRules).toHaveLength(1)
    expect(groupRule?.matchUpdateTypes).not.toContain('major')
  })

  it('schedules the grouped PR weekly', () => {
    expect(groupRule?.schedule).toHaveLength(1)
    expect(groupRule?.schedule?.[0]).toMatch(/on monday$/)
  })

  it('does not hold security PRs behind the schedule or a group', () => {
    // Renovate ignores `schedule` for vulnerability alerts, and the default is
    // groupName null. Overriding either here would change that.
    expect(config.vulnerabilityAlerts?.schedule).toBeUndefined()
    expect(config.vulnerabilityAlerts?.groupName).toBeUndefined()
  })
})

import { groupBy } from '../utils';

export const games = require('./games.json')
export const domains = require('./domains.json')

export const parentDomains = domains.filter(d => d.parent === undefined).sort((a, b) => a.label.localeCompare(b.label));

export const subdomainsByDomain = groupBy(domains, 'parent')
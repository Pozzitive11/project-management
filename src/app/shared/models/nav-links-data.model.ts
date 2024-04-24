import { pageNamesModel } from './page-names.model'

export interface NavLinkInfo {
  link: string
  name: string
  disabled: boolean
  child_links?: NavLinkInfo[]
}

export const navLinksDataModel = {
  mainPartsPages: [{ name: 'Керування проектами', link: '/project-management', disabled: false }],

  [pageNamesModel.reqCheck]: [{ link: '/project-management', name: 'Керування проектами', disabled: false }]
}

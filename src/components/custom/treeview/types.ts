export interface TreeNode {
  id: string
  name: string
  type?: 'file' | 'folder'
  icon?: string
  parentId?: string
  children?: TreeNode[]
}
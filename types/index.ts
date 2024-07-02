export type TAssessmentType = 'before' | 'during' | 'after' | 'notes'
export type TCommentStatus = 'closed' | 'read' | 'editing'
export type TPlatform = 'loomio' | 'decidim' | 'considerit' | 'polis'
export interface INote {
  id: number | string
  note: string
  title: string
  lastUpdated: string
}

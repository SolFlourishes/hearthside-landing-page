import { NextResponse } from 'next/server'
import { getDb } from '@/lib/firebase-admin'

export async function GET() {
  try {
    console.log('[v0] Starting Firebase export...')
    const db = getDb()
    
    const exportData: any = {
      exportedAt: new Date().toISOString(),
      collections: {}
    }

    console.log('[v0] Exporting contact_submissions...')
    const contactsSnapshot = await db.collection('contact_submissions').get()
    exportData.collections.contact_submissions = contactsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    console.log(`[v0] Exported ${contactsSnapshot.size} contact submissions`)

    console.log('[v0] Exporting stories...')
    const storiesSnapshot = await db.collection('stories').get()
    exportData.collections.stories = storiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    console.log(`[v0] Exported ${storiesSnapshot.size} stories`)

    console.log('[v0] Exporting expert_documents...')
    const docsSnapshot = await db.collection('expert_documents').get()
    exportData.collections.expert_documents = docsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    console.log(`[v0] Exported ${docsSnapshot.size} expert documents`)

    console.log('[v0] Export complete!')
    
    return NextResponse.json({
      success: true,
      message: 'Firebase data exported successfully',
      data: exportData,
      summary: {
        contact_submissions: exportData.collections.contact_submissions.length,
        stories: exportData.collections.stories.length,
        expert_documents: exportData.collections.expert_documents.length
      }
    })

  } catch (error) {
    console.error('[v0] Export failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

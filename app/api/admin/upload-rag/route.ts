import { NextResponse } from "next/server"
import { getDb } from "@/lib/firebase-admin"
import { generateEmbedding } from "@/lib/rag-system"

// Import all RAG documents
import beyondCulture from "@/rag-documents/beyond_culture.md"
import creatingPsychologicalSafety from "@/rag-documents/creating_psychological_safety.md"
import emotionRegulationAutism from "@/rag-documents/emotion_regulation_autism.md"
import extendingDoubleEmpathy from "@/rag-documents/extending_double_empathy.md"
import generationalDifferences from "@/rag-documents/generational_differences_workplace.md"
import globalHistoricalTrauma from "@/rag-documents/global-historical-trauma.md"
import globalResearchAsCeremony from "@/rag-documents/global-research-as-ceremony.md"
import globalUbuntuPhilosophy from "@/rag-documents/global-ubuntu-philosophy.md"
import growthMindset from "@/rag-documents/growth_mindset.md"
import howToExplainAdhd from "@/rag-documents/how_to_explain_adhd.md"
import howToTalkSoKidsWillListen from "@/rag-documents/how_to_talk_so_kids_will_listen.md"
import inclusiveCommunicationModel from "@/rag-documents/inclusive_communication_model.md"
import neurodiversityResources from "@/rag-documents/neurodiversity_resources.md"
import overviewGenZ from "@/rag-documents/overview_gen_z.md"
import parentMediatedEarlyIntervention from "@/rag-documents/parent_mediated_early_intervention.md"
import phase3AcceptingBoundaries from "@/rag-documents/phase3-accepting-boundaries.md"
import phase3CulturalDimensions from "@/rag-documents/phase3-cultural-dimensions.md"
import phase3DisciplineAndPunish from "@/rag-documents/phase3-discipline-and-punish.md"
import phase3MissingResponses from "@/rag-documents/phase3-missing-responses.md"
import phase3MutualMisunderstandings from "@/rag-documents/phase3-mutual-misunderstandings.md"
import phase3NeurodiverseRelationships from "@/rag-documents/phase3-neurodiverse-relationships.md"
import phase3NonverbalCommunication from "@/rag-documents/phase3-nonverbal-communication.md"
import phase3ThinkingFastSlow from "@/rag-documents/phase3-thinking-fast-slow.md"
import politalkCivicsAtWork from "@/rag-documents/politalk-civics-at-work.md"
import politalkCodeOfCivilDiscourse from "@/rag-documents/politalk-code-of-civil-discourse.md"
import politalkDogwhistles from "@/rag-documents/politalk-dogwhistles.md"
import politalkIntersectionality from "@/rag-documents/politalk-intersectionality.md"
import politalkLivingRoomConversations from "@/rag-documents/politalk-living-room-conversations.md"
import politalkMoralPolitics from "@/rag-documents/politalk-moral-politics.md"
import politalkPoliticallyMotivatedReasoning from "@/rag-documents/politalk-politically-motivated-reasoning.md"
import politalkRighteousMind from "@/rag-documents/politalk-righteous-mind.md"
import politalkTheWayOut from "@/rag-documents/politalk-the-way-out.md"
import politalkUncivilAgreement from "@/rag-documents/politalk-uncivil-agreement.md"
import positionalityBodyKeepsScore from "@/rag-documents/positionality-body-keeps-score.md"
import positionalityClassistUnderpinnings from "@/rag-documents/positionality-classist-underpinnings.md"
import positionalityUnderstandingPoverty from "@/rag-documents/positionality-understanding-poverty.md"
import socialStories from "@/rag-documents/social_stories.md"
import strategiesForDevelopingInteractionalExpertise from "@/rag-documents/strategies_for_developing_interactional_expertise.md"
import thePresentationOfSelf from "@/rag-documents/the_presentation_of_self.md"
import theWholeBrainChild from "@/rag-documents/the_whole_brain_child.md"
import whatIsAutism from "@/rag-documents/what_is_autism.md"
import youJustDontUnderstand from "@/rag-documents/you_just_dont_understand.md"

const documents = [
  { title: "Beyond Culture", content: beyondCulture, filename: "beyond_culture.md" },
  {
    title: "Creating Psychological Safety",
    content: creatingPsychologicalSafety,
    filename: "creating_psychological_safety.md",
  },
  {
    title: "Emotion Regulation Autism",
    content: emotionRegulationAutism,
    filename: "emotion_regulation_autism.md",
  },
  {
    title: "Extending Double Empathy",
    content: extendingDoubleEmpathy,
    filename: "extending_double_empathy.md",
  },
  {
    title: "Generational Differences Workplace",
    content: generationalDifferences,
    filename: "generational_differences_workplace.md",
  },
  {
    title: "Global Historical Trauma",
    content: globalHistoricalTrauma,
    filename: "global-historical-trauma.md",
  },
  {
    title: "Global Research As Ceremony",
    content: globalResearchAsCeremony,
    filename: "global-research-as-ceremony.md",
  },
  {
    title: "Global Ubuntu Philosophy",
    content: globalUbuntuPhilosophy,
    filename: "global-ubuntu-philosophy.md",
  },
  { title: "Growth Mindset", content: growthMindset, filename: "growth_mindset.md" },
  { title: "How To Explain ADHD", content: howToExplainAdhd, filename: "how_to_explain_adhd.md" },
  {
    title: "How To Talk So Kids Will Listen",
    content: howToTalkSoKidsWillListen,
    filename: "how_to_talk_so_kids_will_listen.md",
  },
  {
    title: "Inclusive Communication Model",
    content: inclusiveCommunicationModel,
    filename: "inclusive_communication_model.md",
  },
  {
    title: "Neurodiversity Resources",
    content: neurodiversityResources,
    filename: "neurodiversity_resources.md",
  },
  { title: "Overview Gen Z", content: overviewGenZ, filename: "overview_gen_z.md" },
  {
    title: "Parent Mediated Early Intervention",
    content: parentMediatedEarlyIntervention,
    filename: "parent_mediated_early_intervention.md",
  },
  {
    title: "Phase 3 Accepting Boundaries",
    content: phase3AcceptingBoundaries,
    filename: "phase3-accepting-boundaries.md",
  },
  {
    title: "Phase 3 Cultural Dimensions",
    content: phase3CulturalDimensions,
    filename: "phase3-cultural-dimensions.md",
  },
  {
    title: "Phase 3 Discipline And Punish",
    content: phase3DisciplineAndPunish,
    filename: "phase3-discipline-and-punish.md",
  },
  {
    title: "Phase 3 Missing Responses",
    content: phase3MissingResponses,
    filename: "phase3-missing-responses.md",
  },
  {
    title: "Phase 3 Mutual Misunderstandings",
    content: phase3MutualMisunderstandings,
    filename: "phase3-mutual-misunderstandings.md",
  },
  {
    title: "Phase 3 Neurodiverse Relationships",
    content: phase3NeurodiverseRelationships,
    filename: "phase3-neurodiverse-relationships.md",
  },
  {
    title: "Phase 3 Nonverbal Communication",
    content: phase3NonverbalCommunication,
    filename: "phase3-nonverbal-communication.md",
  },
  {
    title: "Phase 3 Thinking Fast Slow",
    content: phase3ThinkingFastSlow,
    filename: "phase3-thinking-fast-slow.md",
  },
  {
    title: "Politalk Civics At Work",
    content: politalkCivicsAtWork,
    filename: "politalk-civics-at-work.md",
  },
  {
    title: "Politalk Code Of Civil Discourse",
    content: politalkCodeOfCivilDiscourse,
    filename: "politalk-code-of-civil-discourse.md",
  },
  { title: "Politalk Dogwhistles", content: politalkDogwhistles, filename: "politalk-dogwhistles.md" },
  {
    title: "Politalk Intersectionality",
    content: politalkIntersectionality,
    filename: "politalk-intersectionality.md",
  },
  {
    title: "Politalk Living Room Conversations",
    content: politalkLivingRoomConversations,
    filename: "politalk-living-room-conversations.md",
  },
  {
    title: "Politalk Moral Politics",
    content: politalkMoralPolitics,
    filename: "politalk-moral-politics.md",
  },
  {
    title: "Politalk Politically Motivated Reasoning",
    content: politalkPoliticallyMotivatedReasoning,
    filename: "politalk-politically-motivated-reasoning.md",
  },
  {
    title: "Politalk Righteous Mind",
    content: politalkRighteousMind,
    filename: "politalk-righteous-mind.md",
  },
  { title: "Politalk The Way Out", content: politalkTheWayOut, filename: "politalk-the-way-out.md" },
  {
    title: "Politalk Uncivil Agreement",
    content: politalkUncivilAgreement,
    filename: "politalk-uncivil-agreement.md",
  },
  {
    title: "Positionality Body Keeps Score",
    content: positionalityBodyKeepsScore,
    filename: "positionality-body-keeps-score.md",
  },
  {
    title: "Positionality Classist Underpinnings",
    content: positionalityClassistUnderpinnings,
    filename: "positionality-classist-underpinnings.md",
  },
  {
    title: "Positionality Understanding Poverty",
    content: positionalityUnderstandingPoverty,
    filename: "positionality-understanding-poverty.md",
  },
  { title: "Social Stories", content: socialStories, filename: "social_stories.md" },
  {
    title: "Strategies For Developing Interactional Expertise",
    content: strategiesForDevelopingInteractionalExpertise,
    filename: "strategies_for_developing_interactional_expertise.md",
  },
  {
    title: "The Presentation Of Self",
    content: thePresentationOfSelf,
    filename: "the_presentation_of_self.md",
  },
  { title: "The Whole Brain Child", content: theWholeBrainChild, filename: "the_whole_brain_child.md" },
  { title: "What Is Autism", content: whatIsAutism, filename: "what_is_autism.md" },
  {
    title: "You Just Don't Understand",
    content: youJustDontUnderstand,
    filename: "you_just_dont_understand.md",
  },
]

export const maxDuration = 60 // Set to maximum allowed by Vercel (60 seconds)

export async function GET() {
  try {
    const db = getDb()
    const results = []

    console.log(`[v0] Starting upload of ${documents.length} RAG documents...`)

    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i]
      console.log(`[v0] [${i + 1}/${documents.length}] Processing: ${doc.title}`)

      try {
        // Generate embedding
        const embedding = await generateEmbedding(doc.content)

        // Upload to Firestore
        const docRef = await db.collection("expert_documents").add({
          title: doc.title,
          content: doc.content,
          embedding,
          metadata: {
            filename: doc.filename,
            category: "expert-knowledge",
            tags: [],
          },
          createdAt: new Date().toISOString(),
        })

        results.push({
          title: doc.title,
          success: true,
          id: docRef.id,
        })

        console.log(`[v0] ✓ Uploaded ${doc.title} (ID: ${docRef.id})`)
      } catch (error) {
        console.error(`[v0] ✗ Error uploading ${doc.title}:`, error)
        results.push({
          title: doc.title,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    }

    const successCount = results.filter((r) => r.success).length
    const failCount = results.filter((r) => !r.success).length

    return NextResponse.json({
      success: true,
      message: `Upload complete: ${successCount} succeeded, ${failCount} failed`,
      totalDocuments: documents.length,
      successCount,
      failCount,
      results,
    })
  } catch (error) {
    console.error("[v0] RAG upload failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

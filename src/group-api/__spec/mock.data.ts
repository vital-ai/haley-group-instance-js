import { GraphObject } from "../../util/type";

export const data =  [
    {
      "type": "http://vital.ai/ontology/vital-aimp#MetaQLResultsMessage",
      "types": [
        "http://vital.ai/ontology/vital-aimp#MetaQLResultsMessage"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/MetaQLResultsMessage/1613847641543_668457332",
      "http://vital.ai/ontology/vital-aimp#hasOffset": 0,
      "http://vital.ai/ontology/vital-aimp#hasTotalResults": 14,
      "http://vital.ai/ontology/harbor-ai#hasRequestStatusURI": "http://vital.ai/ontology/harbor-ai#Status_OK",
      "http://vital.ai/ontology/vital-aimp#hasLimit": 10000
    },
    {
      "type": "http://vital.ai/ontology/harbor-ai#HarborSubmission",
      "types": [
        "http://vital.ai/ontology/harbor-ai#HarborSubmission"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HarborSubmission/1611810673817_788449157",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/harbor-saas/Dataset/test-submission-1",
      "http://vital.ai/ontology/vital-core#hasUpdateTime": 1611813157226,
      "http://vital.ai/ontology/harbor-ai#hasSubmissionID": "HARBOR-hur-7788-eqg-5129",
      "http://vital.ai/ontology/vital-core#hasName": "Alpha Beta Roofing HARBOR-hur-7788-eqg-5129",
      "http://vital.ai/ontology/harbor-ai#hasHarborActiveStatusType": "http://vital.ai/ontology/harbor-ai#ActiveStatusType_ACTIVE"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasGroupInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasGroupInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasGroupInstance/1611810674834_788449165",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HarborSubmission/1611810673817_788449157",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyGroupInstance/1611810071849_788433090"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyGroupInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyGroupInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyGroupInstance/1611810071849_788433090",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyGroup": "http://vital.ai/haley.ai/harbor-saas/HaleyGroup/ApplicantInfo",
      "http://vital.ai/ontology/vital-core#hasName": "Applicant Info"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasSectionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasSectionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasSectionInstance/1611810072541_788433170",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyGroupInstance/1611810071849_788433090",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleySectionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleySectionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleySection": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/vital-core#hasName": "Contact Info"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073153_788433254",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073153_788433253"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073153_788433253",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressCity"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073157_788433256",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073153_788433253",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073157_788433255"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073157_788433255",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220180_957219590",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER",
      "http://vital.ai/ontology/haley-ai-question#hasTextAnswerValue": "Laurel, Henrico, Glen Allen, Short Pump, Innsbrook"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073166_788433262",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073166_788433261"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073166_788433261",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressLine1"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073168_788433264",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073166_788433261",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073168_788433263"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073168_788433263",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220178_957219584",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER",
      "http://vital.ai/ontology/haley-ai-question#hasTextAnswerValue": "4521 Highwoods Parkway"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073210_788433286",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073210_788433285"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073210_788433285",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactType"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073212_788433288",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073210_788433285",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073212_788433287"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073212_788433287",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220321_957219726",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073196_788433282",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073196_788433281"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073196_788433281",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressState"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073207_788433284",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073196_788433281",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyChoiceAnswerInstance/1611810073198_788433283"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyChoiceAnswerInstance/1611810073198_788433283",
      "http://vital.ai/ontology/haley-ai-question#hasChoiceAnswerValue": "http://vital.ai/ontology/harbor-ai#US_State_Virginia",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073214_788433290",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073214_788433289"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073214_788433289",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactName"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073216_788433292",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073214_788433289",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073216_788433291"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073216_788433291",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220320_957219723",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER",
      "http://vital.ai/ontology/haley-ai-question#hasTextAnswerValue": "Jimmy James"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073178_788433270",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073177_788433269"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073177_788433269",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073180_788433272",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073177_788433269",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073180_788433271"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073180_788433271",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220321_957219729",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER",
      "http://vital.ai/ontology/haley-ai-question#hasTextAnswerValue": "212-000-0000"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073192_788433278",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073192_788433277"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073192_788433277",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressZip"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073194_788433280",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073192_788433277",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073194_788433279"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073194_788433279",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220317_957219714",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER",
      "http://vital.ai/ontology/haley-ai-question#hasTextAnswerValue": "23060"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073182_788433274",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073182_788433273"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073182_788433273",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneType"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073190_788433276",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073182_788433273",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyChoiceAnswerInstance/1611810073185_788433275"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyChoiceAnswerInstance/1611810073185_788433275",
      "http://vital.ai/ontology/haley-ai-question#hasChoiceAnswerValue": "phonebusiness",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220322_957219732",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073170_788433266",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073170_788433265"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073170_788433265",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-BusinessWebsite"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073173_788433268",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073170_788433265",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073173_788433267"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073173_788433267",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220319_957219720",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER",
      "http://vital.ai/ontology/haley-ai-question#hasTextAnswerValue": "www.hadfield.org"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073218_788433294",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073218_788433293"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073218_788433293",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-InsuredFullName"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073220_788433296",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073218_788433293",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073220_788433295"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073220_788433295",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220155_957219578",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER",
      "http://vital.ai/ontology/haley-ai-question#hasTextAnswerValue": "Alpha Beta Roofing"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073222_788433298",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073222_788433297"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073222_788433297",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073224_788433300",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073222_788433297",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073224_788433299"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073224_788433299",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER",
      "http://vital.ai/ontology/haley-ai-question#hasTextAnswerValue": "jimmy@james.com"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073139_788433250",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073138_788433249"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073138_788433249",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-BusinessPhone"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073151_788433252",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073138_788433249",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073141_788433251"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073141_788433251",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220318_957219717",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER",
      "http://vital.ai/ontology/haley-ai-question#hasTextAnswerValue": "212-000-9999"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073161_788433258",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073161_788433257"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073161_788433257",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressLine2"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073164_788433260",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073161_788433257",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073164_788433259"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073164_788433259",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220179_957219587",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasQuestionInstance/1611810073227_788433302",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleySectionInstance/1611810072541_788433169",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073227_788433301"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073227_788433301",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyQuestion": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-InsuredDBA"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/Edge_hasAnswerInstance/1611810073229_788433304",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/haley-saas/HaleyQuestionInstance/1611810073227_788433301",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073229_788433303"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
      ],
      "URI": "http://vital.ai/haley.ai/haley-saas/HaleyTextAnswerInstance/1611810073229_788433303",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-submissionmanager-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswer": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220177_957219581",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerFollowupType": "http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyGroup",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyGroup"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyGroup/ApplicantInfo",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasGroupIndex": 0,
      "http://vital.ai/ontology/harbor-ai#hasHarborGroupTypeURI": "http://vital.ai/ontology/harbor-ai#GroupType_SUBMISSION",
      "http://vital.ai/ontology/vital-core#hasName": "Applicant Info"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasSection",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasSection"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasSection/1597780219538_957219576",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyGroup/ApplicantInfo",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleySection",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleySection"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasSectionIndex": 100,
      "http://vital.ai/ontology/vital-core#hasName": "Contact Info"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220324_957219740",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 14,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "ContactEmail",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Email address of the contact"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220324_957219742",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220321_957219728",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 12,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "ContactPhoneNumber",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Enter the phone number of the contact"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220322_957219730",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220321_957219729"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220321_957219729",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryPhoneNumber"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220320_957219725",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 11,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactType"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactType",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "ContactType",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Type of contact (accounting, claims, etc.)"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220321_957219727",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactType",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220321_957219726"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220321_957219726",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_ContactDescription"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220319_957219722",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 10,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactName"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactName",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "ContactName",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Enter the full name of the insured's contact for policy matters"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220320_957219724",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactName",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220320_957219723"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220320_957219723",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_FullName"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220319_957219719",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 9,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-BusinessWebsite"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-BusinessWebsite",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "BusinessWebsite",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Enter insured's primary business website address"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220319_957219721",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-BusinessWebsite",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220319_957219720"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220319_957219720",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Primary_WebsiteAddress"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220318_957219716",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 8,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-BusinessPhone"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-BusinessPhone",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "BusinessPhone",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Enter insured's primary business phone number"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220318_957219718",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-BusinessPhone",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220318_957219717"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220318_957219717",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Primary_PhoneNumber"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220316_957219713",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 7,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressZip"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressZip",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "MailingAddressZip",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Enter insured's mailing address postal code (+4)"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220317_957219715",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressZip",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220317_957219714"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220317_957219714",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_MailingAddress_PostalCode"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220180_957219589",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 5,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressCity"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressCity",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "MailingAddressCity",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Enter insured's mailing address city"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220180_957219591",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressCity",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220180_957219590"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220180_957219590",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_MailingAddress_CityName"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220179_957219586",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 4,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressLine2"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressLine2",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "MailingAddressLine2",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Enter insured's mailing address line 2"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220179_957219588",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressLine2",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220179_957219587"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220179_957219587",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_MailingAddress_LineTwo"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220178_957219583",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 3,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressLine1"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressLine1",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "MailingAddressLine1",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Enter insured's mailing address line 1"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220178_957219585",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressLine1",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220178_957219584"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220178_957219584",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_MailingAddress_LineOne"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220177_957219580",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 2,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-InsuredDBA"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-InsuredDBA",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "InsuredDBA",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Enter insured's DBA or trade name, as applicable"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220177_957219582",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-InsuredDBA",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220177_957219581"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220177_957219581",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_DBA"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220147_957219577",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 1,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-InsuredFullName"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-InsuredFullName",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "InsuredFullName",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Enter insured's registered business name, as it would appear on the policy"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220157_957219579",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-InsuredFullName",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220155_957219578"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220155_957219578",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_FullName"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220322_957219731",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 13,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneType"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneType",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "ContactPhoneType",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Indicate the type of phone number of the contact"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220322_957219733",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneType",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220322_957219732"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220322_957219732",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryPhoneType"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220324_957219739",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220322_957219732",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220323_957219738"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220323_957219738",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Home",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 3,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "phonehome"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220323_957219737",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220322_957219732",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220323_957219736"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220323_957219736",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Mobile",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 2,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "phonemobile"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220323_957219735",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220322_957219732",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220323_957219734"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220323_957219734",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Business",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 1,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "phonebusiness"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220181_957219592",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 6,
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressState"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressState",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "MailingAddressState",
      "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
      "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Enter insured's mailing address state or province"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220183_957219594",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-MailingAddressState",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswer",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswer"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#isAnswerSetOptions": true,
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetSourceURI": "http://vital.ai/ontology/harbor-ai#AnswerSet_USStateOrTerritory",
      "http://vital.ai/ontology/haley-ai-question#hasPreferredSelectorType": "http://vital.ai/ontology/haley-ai-question#HaleyDropdownSelector",
      "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_MailingAddress_StateOrProvinceCode"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220313_957219712",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220313_957219711"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220313_957219711",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Wyoming",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 5900,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Wyoming",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Wyoming"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220313_957219710",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220313_957219709"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220313_957219709",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Wisconsin",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 5800,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Wisconsin",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Wisconsin"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220313_957219708",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220312_957219707"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220312_957219707",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "West Virgina",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 5700,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_WestVirginia",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_WestVirginia"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220312_957219706",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220312_957219705"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220312_957219705",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Washington, D.C.",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 5600,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_FederalDistrict_DistrictOfColumbia",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_FederalDistrict_DistrictOfColumbia"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220312_957219704",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220312_957219703"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220312_957219703",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Washington",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 5500,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Washington",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Washington"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220312_957219702",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220312_957219701"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220312_957219701",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Virgina",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 5400,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Virginia",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Virginia"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220311_957219700",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220311_957219699"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220311_957219699",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Virgin Islands",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 5300,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_Territory_VirginIslands",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_Territory_VirginIslands"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220311_957219698",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220311_957219697"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220311_957219697",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Vermont",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 5200,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Vermont",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Vermont"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220311_957219696",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220311_957219695"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220311_957219695",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Utah",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 5100,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Utah",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Utah"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220311_957219694",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220310_957219693"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220310_957219693",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Texas",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 5000,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Texas",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Texas"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220310_957219692",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220310_957219691"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220310_957219691",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Tennessee",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 4900,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Tennessee",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Tennessee"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220310_957219690",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220310_957219689"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220310_957219689",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "South Dakota",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 4800,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_SouthDakota",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_SouthDakota"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220309_957219688",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220309_957219687"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220309_957219687",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "South Carolina",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 4700,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_SouthCarolina",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_SouthCarolina"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220309_957219686",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220309_957219685"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220309_957219685",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Rhode Island",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 4600,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_RhodeIsland",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_RhodeIsland"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220309_957219684",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220309_957219683"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220309_957219683",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Puerto Rico",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 4500,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_Territory_PuertoRico",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_Territory_PuertoRico"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220308_957219682",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220308_957219681"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220308_957219681",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Pennsylvania",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 4400,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Pennsylvania",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Pennsylvania"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220308_957219680",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220308_957219679"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220308_957219679",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Palau",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 4300,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_Territory_Palau",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_Territory_Palau"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220308_957219678",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220308_957219677"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220308_957219677",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Oregon",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 4200,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Oregon",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Oregon"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220307_957219676",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220307_957219675"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220307_957219675",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Oklahoma",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 4100,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Oklahoma",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Oklahoma"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220307_957219674",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220307_957219673"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220307_957219673",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Ohio",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 4000,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Ohio",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Ohio"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220307_957219672",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220307_957219671"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220307_957219671",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Northern Marianas",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 3900,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_Territory_NorthernMarianas",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_Territory_NorthernMarianas"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220307_957219670",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220306_957219669"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220306_957219669",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "North Dakota",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 3800,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_NorthDakota",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_NorthDakota"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220306_957219668",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220306_957219667"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220306_957219667",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "North Carolina",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 3700,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_NorthCarolina",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_NorthCarolina"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220306_957219666",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220306_957219665"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220306_957219665",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "New York",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 3600,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_NewYork",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_NewYork"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220306_957219664",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220306_957219663"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220306_957219663",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "New Mexico",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 3500,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_NewMexico",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_NewMexico"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220306_957219662",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220305_957219661"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220305_957219661",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "New Jersey",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 3400,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_NewJersey",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_NewJersey"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220305_957219660",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220305_957219659"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220305_957219659",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "New Hampshire",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 3300,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_NewHampshire",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_NewHampshire"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220305_957219658",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220305_957219657"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220305_957219657",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Nevada",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 3200,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Nevada",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Nevada"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220305_957219656",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220305_957219655"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220305_957219655",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Nebraska",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 3100,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Nebraska",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Nebraska"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220305_957219654",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220304_957219653"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220304_957219653",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Montana",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 3000,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Montana",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Montana"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220304_957219652",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220304_957219651"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220304_957219651",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Missouri",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 2900,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Missouri",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Missouri"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220304_957219650",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220304_957219649"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220304_957219649",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Mississippi",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 2800,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Mississippi",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Mississippi"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220304_957219648",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220304_957219647"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220304_957219647",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Minnesota",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 2700,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Minnesota",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Minnesota"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220304_957219646",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220303_957219645"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220303_957219645",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Micronesia",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 2600,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_Territory_Micronesia",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_Territory_Micronesia"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220303_957219644",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220303_957219643"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220303_957219643",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Michigan",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 2500,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Michigan",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Michigan"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220303_957219642",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220303_957219641"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220303_957219641",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Massachusetts",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 2400,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Massachusetts",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Massachusetts"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220303_957219640",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220303_957219639"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220303_957219639",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Maryland",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 2300,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Maryland",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Maryland"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220303_957219638",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220302_957219637"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220302_957219637",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Marshall Islands",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 2200,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_Territory_MarshallIslands",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_Territory_MarshallIslands"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220302_957219636",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220302_957219635"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220302_957219635",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Maine",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 2100,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Maine",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Maine"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220302_957219634",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220302_957219633"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220302_957219633",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Louisiana",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 2000,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Louisiana",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Louisiana"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220302_957219632",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220302_957219631"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220302_957219631",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Kentucky",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 1900,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Kentucky",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Kentucky"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220302_957219630",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220301_957219629"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220301_957219629",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Kansas",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 1800,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Kansas",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Kansas"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220301_957219628",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220301_957219627"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220301_957219627",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Iowa",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 1700,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Iowa",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Iowa"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220301_957219626",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220300_957219625"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220300_957219625",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Indiana",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 1600,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Indiana",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Indiana"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220300_957219624",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220299_957219623"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220299_957219623",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Illinois",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 1500,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Illinois",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Illinois"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220299_957219622",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220299_957219621"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220299_957219621",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Idaho",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 1400,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Idaho",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Idaho"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220299_957219620",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220298_957219619"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220298_957219619",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Hawaii",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 1300,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Hawaii",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Hawaii"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220298_957219618",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220298_957219617"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220298_957219617",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Guam",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 1200,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_Territory_Guam",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_Territory_Guam"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220298_957219616",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220298_957219615"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220298_957219615",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Georgia",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 1100,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Georgia",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Georgia"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220297_957219614",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220297_957219613"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220297_957219613",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Florida",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 1000,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Florida",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Florida"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220297_957219612",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220297_957219611"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220297_957219611",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Delaware",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 900,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Delaware",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Delaware"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220297_957219610",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220297_957219609"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220297_957219609",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Connecticut",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 800,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Connecticut",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Connecticut"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220297_957219608",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220296_957219607"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220296_957219607",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Colorado",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 700,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Colorado",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Colorado"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220296_957219606",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220296_957219605"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220296_957219605",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "California",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 600,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_California",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_California"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220296_957219604",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220296_957219603"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220296_957219603",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Arkansas",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 500,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Arkansas",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Arkansas"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220296_957219602",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220295_957219601"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220295_957219601",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Arizona",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 400,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Arizona",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Arizona"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220295_957219600",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220295_957219599"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220295_957219599",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "American Samoa",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 300,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_Territory_AmericanSamoa",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_Territory_AmericanSamoa"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220295_957219598",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220294_957219597"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220294_957219597",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Alaska",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 200,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Alaska",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Alaska"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswerOption/1597780220294_957219596",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyChoiceAnswer/1597780220183_957219593",
      "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220254_957219595"
    },
    {
      "type": "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption",
      "types": [
        "http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption"
      ],
      "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerOption/1597780220254_957219595",
      "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
      "http://vital.ai/ontology/haley-ai-question#hasOptionName": "Alabama",
      "http://vital.ai/ontology/haley-ai-question#hasOptionOrder": 100,
      "http://vital.ai/ontology/haley-ai-question#hasOptionValue": "http://vital.ai/ontology/harbor-ai#US_State_Alabama",
      "http://vital.ai/ontology/haley-ai-question#hasAnswerSetMemberURI": "http://vital.ai/ontology/harbor-ai#US_State_Alabama"
    }
]

export const group1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyGroup",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyGroup"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyGroup/ApplicantInfo",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/haley-ai-question#hasGroupIndex": 0,
  "http://vital.ai/ontology/harbor-ai#hasHarborGroupTypeURI": "http://vital.ai/ontology/harbor-ai#GroupType_SUBMISSION",
  "http://vital.ai/ontology/vital-core#hasName": "Applicant Info"
};
export const edgeGroupToSection = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasSection",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasSection"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasSection/1597780220321_049580345",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyGroup/ApplicantInfo",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo"
}
export const rootSection1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleySection",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleySection"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/haley-ai-question#hasSectionIndex": 100,
  "http://vital.ai/ontology/vital-core#hasName": "Contact Info"
};

export const edgeSectionToQuestion1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220321_957219728",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
  "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 12,
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber"
};
export const rootQuestion1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "ContactPhoneNumber",
  "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
  "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Enter the phone number of the contact"
};
export const edgeRootQuestionToAnswer1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220322_957219730",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220321_957219729"
};
export const rootAnswer1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220321_957219729",
  "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryPhoneNumber"
};
export const edgeRootSectionToRow1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasRow",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasRow"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasRow/1597780220324_019840341023",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row"
}
export const rootRow = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyRow",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyRow"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row",
  "http://vital.ai/ontology/harbor-ai#hasHaleyRowTypeURI": "http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy"
};
export const edgeRootRowToQuestion1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220324_8938293",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail"
};
export const firstLevelQuestion1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "ContactEmail",
  "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
  "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Email address of the contact"
};
export const edgeFirstLevelQuestionToAnswer1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220324_957219742",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741"
};
export const firstLevelAnswer1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741",
  "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress"
};
export const edgeToSecondLevelRow = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasRow",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasRow"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasRow/1597780220324_2302938081",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row"
}
export const secondLevelRow = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyRow",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyRow"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row",
};
export const edgeToSecondLevelQuestion = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220324_9582083450",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/mock-row-row-question"
};
export const secondLevelQuestion1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/mock-row-row-question",
  "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "row-row-question",
}
export const edgeSecondLevelQuestionToAnswer1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220324_92345234523",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/mock-row-row-question",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_0352345803"
};
export const secondLevelAnswer1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_0352345803",
  "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
};
export const redundantObject = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestion",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyQuestion"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactType",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "ContactType",
  "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
  "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Type of contact (accounting, claims, etc.)"
}

export const dataTestGroup = [
  group1,
  edgeGroupToSection,
  rootSection1,
  edgeSectionToQuestion1,
  rootQuestion1,
  edgeRootQuestionToAnswer1,
  rootAnswer1,
  edgeRootSectionToRow1,
  rootRow,
  edgeRootRowToQuestion1,
  firstLevelQuestion1,
  edgeFirstLevelQuestionToAnswer1,
  firstLevelAnswer1,
  edgeToSecondLevelRow,
  secondLevelRow,
  edgeToSecondLevelQuestion,
  secondLevelQuestion1,
  edgeSecondLevelQuestionToAnswer1,
  secondLevelAnswer1,
  redundantObject,
] as any as GraphObject[];

export const dataTestGroupMissingSection = [
  group1,
  edgeGroupToSection,
];

export const edgeRootQuestionToNumberAnswer1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220322_957219730",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyNumberAnswer/1597780220321_957219729"
};
export const rootNumberAnswer1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyNumberAnswer",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyNumberAnswer"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyNumberAnswer/1597780220321_957219729",
  "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1"
};

export const dataTestNumberData: GraphObject[] = [
  group1,
  edgeGroupToSection,
  rootSection1,
  edgeSectionToQuestion1,
  rootQuestion1,
  edgeRootQuestionToNumberAnswer1,
  rootNumberAnswer1
] as any as GraphObject[];

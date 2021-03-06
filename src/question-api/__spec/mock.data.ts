export const dataTextQuestion = [
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
];

export const dataTextQuestionWithoutEdge = [
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
    "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
    "types": [
      "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
    ],
    "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741",
    "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
    "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
    "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress"
  },
];

export const dataTextQuestionWithMultipleMatch = [
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
    "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer",
    "types": [
      "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer"
    ],
    "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220324_957219743",
    "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
    "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail",
    "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219744"
  },
  {
    "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer",
    "types": [
      "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer"
    ],
    "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219744",
    "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
    "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
    "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress"
  },
];

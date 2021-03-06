
export const rootRow = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyRow",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyRow"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row",
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

export const dataTestRow = [
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
];

export const dataTestRowMissingQuestion = [
  {
    "type": "http://vital.ai/ontology/haley-ai-question#HaleyRow",
    "types": [
      "http://vital.ai/ontology/haley-ai-question#HaleyRow"
    ],
    "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row",
  },
  {
    "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
    "types": [
      "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
    ],
    "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220324_8938293",
    "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row",
    "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail"
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

export const dataTestRowMissingRow = [
  {
    "type": "http://vital.ai/ontology/haley-ai-question#HaleyRow",
    "types": [
      "http://vital.ai/ontology/haley-ai-question#HaleyRow"
    ],
    "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row",
  },
  {
    "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion",
    "types": [
      "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion"
    ],
    "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220324_8938293",
    "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row",
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
    "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasRow",
    "types": [
      "http://vital.ai/ontology/haley-ai-question#Edge_hasRow"
    ],
    "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasRow/1597780220324_892829342384",
    "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row",
    "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row"
  },
];

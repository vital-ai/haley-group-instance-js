import { GraphObject } from '../../util/type';

export const groupInstance1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyGroupInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyGroup"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyGroup/ApplicantInfo",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/haley-ai-question#hasGroupIndex": 0,
  "http://vital.ai/ontology/harbor-ai#hasHarborGroupTypeURI": "http://vital.ai/ontology/harbor-ai#GroupType_SUBMISSION",
  "http://vital.ai/ontology/vital-core#hasName": "Applicant Info"
} as any as GraphObject;
export const edgeGroupToSectionInstance = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasSectionInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasSectionInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasSection/1597780220321_049580345",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyGroup/ApplicantInfo",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo"
}
export const rootSectionInstance1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleySectionInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleySectionInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/haley-ai-question#hasSectionIndex": 100,
  "http://vital.ai/ontology/vital-core#hasName": "Contact Info"
};

export const edgeSectionToQuestionInstance1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220321_957219728",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
  "http://vital.ai/ontology/haley-ai-question#hasQuestionIndex": 12,
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber"
};
export const rootQuestionInstance1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "ContactPhoneNumber",
  "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
  "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Enter the phone number of the contact"
};
export const edgeRootQuestionToAnswerInstance1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220322_957219730",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactPhoneNumber",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220321_957219729"
};
export const rootAnswerInstance1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220321_957219729",
  "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryPhoneNumber"
};
export const edgeRootSectionToRowInstance1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasRow/1597780220324_019840341023",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleySection/Applicant-Info-ContactInfo",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row"
}
export const rootRowInstance = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyRowInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyRowInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row",
  "http://vital.ai/ontology/harbor-ai#hasHaleyRowTypeURI": "http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy"
};
export const edgeRootRowToQuestionInstance1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220324_8938293",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail"
};
export const firstLevelQuestionInstance1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "ContactEmail",
  "http://vital.ai/ontology/haley-ai-question#isHiddenQuestion": false,
  "http://vital.ai/ontology/haley-ai-question#hasQuestionText": "Email address of the contact"
};
export const edgeFirstLevelQuestionToAnswerInstance1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220324_957219742",
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/Applicant-Info-ContactInfo-ContactEmail",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741"
};
export const firstLevelAnswerInstance1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_957219741",
  "http://vital.ai/ontology/haley-ai-question#isReadOnlyAnswerValue": false,
  "http://vital.ai/ontology/vital-core#hasProvenance": "http://vital.ai/haley.ai/haley-saas/Dataset/harbor-applicantinfo-group-1",
  "http://vital.ai/ontology/haley-ai-question#hasHaleyAnswerType": "http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress"
};
export const edgeToSecondLevelRowInstance = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasRow/1597780220324_2302938081",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row"
}
export const secondLevelRowInstance = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyRowInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyRowInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row",
};
export const edgeToSecondLevelQuestionInstance = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasQuestion/1597780220324_9582083450",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyRow/mock-row-row",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/mock-row-row-question"
};
export const secondLevelQuestionInstance1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/mock-row-row-question",
  "http://vital.ai/ontology/haley-ai-question#hasQuestionIdentifier": "row-row-question",
}
export const edgeSecondLevelQuestionToAnswer1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance"
  ],
  "URI": "http://vital.ai/haley.ai/harbor-saas/Edge_hasAnswer/1597780220324_92345234523",
  "http://vital.ai/ontology/vital-core#hasEdgeSource": "http://vital.ai/haley.ai/harbor-saas/HaleyQuestion/mock-row-row-question",
  "http://vital.ai/ontology/vital-core#hasEdgeDestination": "http://vital.ai/haley.ai/harbor-saas/HaleyTextAnswer/1597780220324_0352345803"
};
export const secondLevelAnswerInstance1 = {
  "type": "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance",
  "types": [
    "http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance"
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

export const dataTestGroupInstance = [
  groupInstance1,
  edgeGroupToSectionInstance,
  rootSectionInstance1,
  edgeSectionToQuestionInstance1,
  rootQuestionInstance1,
  edgeRootQuestionToAnswerInstance1,
  rootAnswerInstance1,
  edgeRootSectionToRowInstance1,
  rootRowInstance,
  edgeRootRowToQuestionInstance1,
  firstLevelQuestionInstance1,
  edgeFirstLevelQuestionToAnswerInstance1,
  firstLevelAnswerInstance1,
  edgeToSecondLevelRowInstance,
  secondLevelRowInstance,
  edgeToSecondLevelQuestionInstance,
  secondLevelQuestionInstance1,
  edgeSecondLevelQuestionToAnswer1,
  secondLevelAnswerInstance1,
] as any as GraphObject[];

export const dataLackOfSectionInstanceObject = [
  groupInstance1,
  edgeGroupToSectionInstance,
  edgeSectionToQuestionInstance1,
  rootQuestionInstance1,
  edgeRootQuestionToAnswerInstance1,
  rootAnswerInstance1,
  edgeRootSectionToRowInstance1,
  rootRowInstance,
  edgeRootRowToQuestionInstance1,
  firstLevelQuestionInstance1,
  edgeFirstLevelQuestionToAnswerInstance1,
  firstLevelAnswerInstance1,
  edgeToSecondLevelRowInstance,
  secondLevelRowInstance,
  edgeToSecondLevelQuestionInstance,
  secondLevelQuestionInstance1,
  edgeSecondLevelQuestionToAnswer1,
  secondLevelAnswerInstance1,
] as any as GraphObject[];

export const dataLackOfRowInstanceObject = [
  groupInstance1,
  edgeGroupToSectionInstance,
  rootSectionInstance1,
  edgeSectionToQuestionInstance1,
  rootQuestionInstance1,
  edgeRootQuestionToAnswerInstance1,
  rootAnswerInstance1,
  edgeRootSectionToRowInstance1,
  edgeRootRowToQuestionInstance1,
  firstLevelQuestionInstance1,
  edgeFirstLevelQuestionToAnswerInstance1,
  firstLevelAnswerInstance1,
  edgeToSecondLevelRowInstance,
  secondLevelRowInstance,
  edgeToSecondLevelQuestionInstance,
  secondLevelQuestionInstance1,
  edgeSecondLevelQuestionToAnswer1,
  secondLevelAnswerInstance1,
] as any as GraphObject[];


export const dataLackOfQuestionInstanceObject1 = [
  groupInstance1,
  edgeGroupToSectionInstance,
  rootSectionInstance1,
  edgeSectionToQuestionInstance1,
  edgeRootQuestionToAnswerInstance1,
  rootAnswerInstance1,
  edgeRootSectionToRowInstance1,
  rootRowInstance,
  edgeRootRowToQuestionInstance1,
  firstLevelQuestionInstance1,
  edgeFirstLevelQuestionToAnswerInstance1,
  firstLevelAnswerInstance1,
  edgeToSecondLevelRowInstance,
  secondLevelRowInstance,
  edgeToSecondLevelQuestionInstance,
  secondLevelQuestionInstance1,
  edgeSecondLevelQuestionToAnswer1,
  secondLevelAnswerInstance1,
] as any as GraphObject[];

export const dataLackOfQuestionInstanceObject2 = [
  groupInstance1,
  edgeGroupToSectionInstance,
  rootSectionInstance1,
  edgeSectionToQuestionInstance1,
  rootQuestionInstance1,
  edgeRootQuestionToAnswerInstance1,
  rootAnswerInstance1,
  edgeRootSectionToRowInstance1,
  rootRowInstance,
  edgeRootRowToQuestionInstance1,
  edgeFirstLevelQuestionToAnswerInstance1,
  firstLevelAnswerInstance1,
  edgeToSecondLevelRowInstance,
  secondLevelRowInstance,
  edgeToSecondLevelQuestionInstance,
  secondLevelQuestionInstance1,
  edgeSecondLevelQuestionToAnswer1,
  secondLevelAnswerInstance1,
] as any as GraphObject[];

export const dataLackOfAnswerInstanceObject = [
  groupInstance1,
  edgeGroupToSectionInstance,
  rootSectionInstance1,
  edgeSectionToQuestionInstance1,
  rootQuestionInstance1,
  edgeRootQuestionToAnswerInstance1,
  edgeRootSectionToRowInstance1,
  rootRowInstance,
  edgeRootRowToQuestionInstance1,
  firstLevelQuestionInstance1,
  edgeFirstLevelQuestionToAnswerInstance1,
  firstLevelAnswerInstance1,
  edgeToSecondLevelRowInstance,
  secondLevelRowInstance,
  edgeToSecondLevelQuestionInstance,
  secondLevelQuestionInstance1,
  edgeSecondLevelQuestionToAnswer1,
  secondLevelAnswerInstance1,
] as any as GraphObject[];

export const dataLackOfEdgeToAnswerInstanceObject = [
  groupInstance1,
  edgeGroupToSectionInstance,
  rootSectionInstance1,
  edgeSectionToQuestionInstance1,
  rootQuestionInstance1,
  rootAnswerInstance1,
  edgeRootSectionToRowInstance1,
  rootRowInstance,
  edgeRootRowToQuestionInstance1,
  firstLevelQuestionInstance1,
  edgeFirstLevelQuestionToAnswerInstance1,
  firstLevelAnswerInstance1,
  edgeToSecondLevelRowInstance,
  secondLevelRowInstance,
  edgeToSecondLevelQuestionInstance,
  secondLevelQuestionInstance1,
  edgeSecondLevelQuestionToAnswer1,
  secondLevelAnswerInstance1,
] as any as GraphObject[];
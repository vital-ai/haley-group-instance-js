export const TYPE_HALEY_SECTION = 'http://vital.ai/ontology/haley-ai-question#HaleySection';
export const TYPE_HALEY_ROW = 'http://vital.ai/ontology/haley-ai-question#HaleyRow';
export const TYPE_HALEY_QUESTION = 'http://vital.ai/ontology/haley-ai-question#HaleyQuestion';
export const TYPE_HALEY_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyAnswer';
export const TYPE_HALEY_GROUP = 'http://vital.ai/ontology/haley-ai-question#HaleyGroup';
export const TYPE_HALEY_GROUP_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyGroupInstance';
export const TYPE_HALEY_SECTION_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleySectionInstance';
export const TYPE_HALEY_ROW_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyRowInstance';
export const TYPE_HALEY_QUESTION_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyQuestionInstance';
export const TYPE_HALEY_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyAnswerInstance';
export const TYPE_HALEY_ANSWER_OPTION = 'http://vital.ai/ontology/haley-ai-question#HaleyAnswerOption';
export const TYPE_HALEY_DEFAULT_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyDefaultAnswer';
export const TYPE_HALEY_TAXONOMY = 'http://vital.ai/ontology/haley-ai-question#HaleyTaxonomy';

export const TYPE_HALEY_TEXT_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyTextAnswerInstance';
export const TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyBooleanAnswerInstance';
export const TYPE_HALEY_CHOICE_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswerInstance';
export const TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyDateTimeAnswerInstance';
export const TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyLongTextAnswerInstance';
export const TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyFileUploadAnswerInstance';
export const TYPE_HALEY_NUMBER_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyNumberAnswerInstance';
export const TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyMultiChoiceAnswerInstance';
export const TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleySignatureAnswerInstance';
export const TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyTaxonomyAnswerInstance';
export const TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#HaleyMultiTaxonomyAnswerInstance';

export const TYPE_HALEY_TEXT_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyTextAnswer';
export const TYPE_HALEY_BOOLEAN_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyBooleanAnswer';
export const TYPE_HALEY_CHOICE_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyChoiceAnswer';
export const TYPE_HALEY_DATE_TIME_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyDateTimeAnswer';
export const TYPE_HALEY_LONG_TEXT_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyLongTextAnswer';
export const TYPE_HALEY_FILE_UPLOAD_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyFileUploadAnswer';
export const TYPE_HALEY_NUMBER_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyNumberAnswer';
export const TYPE_HALEY_MULTI_CHOICE_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyMultiChoiceAnswer';
export const TYPE_HALEY_SIGNATURE_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleySignatureAnswer';
export const TYPE_HALEY_TAXONOMY_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyTaxonomyAnswer';
export const TYPE_HALEY_MULTI_TAXONOMY_ANSWER = 'http://vital.ai/ontology/haley-ai-question#HaleyMultiTaxonomyAnswer';

export const TYPE_FOLLOWUP_FIRM_ANSWER = 'http://vital.ai/ontology/haley-ai-question#AnswerFollowup_FIRM_ANSWER';
export const TYPE_FOLLOWUP_NO_ANSWER = 'http://vital.ai/ontology/haley-ai-question#AnswerFollowup_NO_ANSWER';

export const MAPPING_ANSWER_TO_ANSWER_INSTANCE = new Map<string, string>([
    [TYPE_HALEY_TEXT_ANSWER, TYPE_HALEY_TEXT_ANSWER_INSTANCE],
    [TYPE_HALEY_BOOLEAN_ANSWER, TYPE_HALEY_BOOLEAN_ANSWER_INSTANCE],
    [TYPE_HALEY_CHOICE_ANSWER, TYPE_HALEY_CHOICE_ANSWER_INSTANCE],
    [TYPE_HALEY_DATE_TIME_ANSWER, TYPE_HALEY_DATE_TIME_ANSWER_INSTANCE],
    [TYPE_HALEY_LONG_TEXT_ANSWER, TYPE_HALEY_LONG_TEXT_ANSWER_INSTANCE],
    [TYPE_HALEY_FILE_UPLOAD_ANSWER, TYPE_HALEY_FILE_UPLOAD_ANSWER_INSTANCE],
    [TYPE_HALEY_NUMBER_ANSWER, TYPE_HALEY_NUMBER_ANSWER_INSTANCE],
    [TYPE_HALEY_MULTI_CHOICE_ANSWER, TYPE_HALEY_MULTI_CHOICE_ANSWER_INSTANCE],
    [TYPE_HALEY_SIGNATURE_ANSWER, TYPE_HALEY_SIGNATURE_ANSWER_INSTANCE],
    [TYPE_HALEY_TAXONOMY_ANSWER, TYPE_HALEY_TAXONOMY_ANSWER_INSTANCE],
    [TYPE_HALEY_MULTI_TAXONOMY_ANSWER, TYPE_HALEY_MULTI_TAXONOMY_ANSWER_INSTANCE],
]);


export const SHORT_NAME_HALEY_ANSWER_TYPE = 'haleyAnswerType';
export const SHORT_NAME_HALEY_ROW_TYPE_URI = 'haleyRowTypeURI';
export const SHORT_NAME_HALEY_ROW_INSTANCE_COUNTER = 'rowInstanceCounter';
export const SHORT_NAME_HALEY_ANSWER_DATA_TYPE = 'haleyAnswerDataType';
export const SHORT_NAME_EDGE_SOURCE = 'edgeSource';
export const SHORT_NAME_EDGE_DESTINATION = 'edgeDestination';
export const SHORT_NAME_FOLLOWUP_TYPE = 'haleyAnswerFollowupType';

// GroupInstance
export const SHORT_NAME_HALEY_GROUP = 'haleyGroup';
export const SHORT_NAME_HALEY_ROW = 'haleyRow';
export const SHORT_NAME_HALEY_QUESTION = 'haleyQuestion';
export const SHORT_NAME_HALEY_ANSWER = 'haleyAnswer';
export const SHORT_NAME_HALEY_SECTION = 'haleySection';
export const SHORT_NAME_TEXT_ANSWER_VALUE = 'textAnswerValue';

export const EDGE_GROUP_INSTANCE = "http://vital.ai/ontology/haley-ai-question#Edge_hasGroupInstance";
export const EDGE_SECTION = 'http://vital.ai/ontology/haley-ai-question#Edge_hasSection';
export const EDGE_ROW = 'http://vital.ai/ontology/haley-ai-question#Edge_hasRow';
export const EDGE_QUESTION = 'http://vital.ai/ontology/haley-ai-question#Edge_hasQuestion';
export const EDGE_ANSWER = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswer';
export const EDGE_SECTION_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#Edge_hasSectionInstance';
export const EDGE_ROW_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#Edge_hasRowInstance';
export const EDGE_QUESTION_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionInstance';
export const EDGE_ANSWER_INSTANCE = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerInstance';
export const EDGE_ANSWER_OPTION = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOption';
export const EDGE_ANSWER_OPTION_VALUE_DEPENDENCY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOptionValueDependency';
export const EDGE_ANSWER_OPTION_DEPENDENCY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasAnswerOptionDependency';
export const EDGE_QUESTION_DEPENDENCY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasQuestionDependency';
export const EDGE_TAXONOMY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasTaxonomy';
export const EDGE_ENHANCEMENT_RULE_DEPENDENCY = 'http://vital.ai/ontology/haley-ai-question#Edge_hasEnhancementRuleDependency';
export const EDGE_DEFAULT_ANSWER = 'http://vital.ai/ontology/haley-ai-question#Edge_hasDefaultAnswer';


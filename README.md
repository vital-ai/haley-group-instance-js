# haley-group-instance-js

## develop
install npx: 
    npm install -g npx

## unit test set up
should copy all the domains file into vitalservice/domains, domains files are only use for testing. will not be compiled and published to npm.
use command: **npm run test**

## build
use command: **npm run build**


## publish to npm
use command: **npm publish**


## GroupAPI
```js
    // creating instances objects
    const groupAPI = new GroupAPI(vitaljs, logger);
    const qaInstanceObjects = groupAPI.createQaInstanceObjects(qaObjects);

    // setting value by answerType
    const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress';
    groupAPI.setValueByAnswerType(qaObjects, qaInstanceObjects, answerType, 'aaaa@bbbb.com');


    // getting value by answerType
    const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress';
    const value = groupAPI.getValueByAnswerType(qaObjects, qaInstanceObjects, answerType);
```
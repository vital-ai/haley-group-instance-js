# haley-group-instance-js

## develop
install npx: 
    npm install -g npx

## unit test set up
should copy all the domains file into vitalservice/domains, domains files are only use for testing. will not be compiled and published to npm.
use command: **npm run test**

## build
use command: **npm run build**


## publish to npm  // should update the package version every time we publish a package.
use command: **npm publish**


## install
```js
    npm install @vital-ai/haley-group-instance
```


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

    // setValueByAnswerTypeInsideRow
    const rowTypeURI = 'http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy';
    const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Contact_PrimaryEmailAddress';
    const rowInstanceCounter = 'AB'; // the second instance of rowType
    const value = 'aaa@bbb.com';
    groupAPI.setValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType, value)

    // getValueByAnswerTypeInsideRow
    const value = groupAPI.setValueByAnswerTypeInsideRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, answerType, value);

    // setValueByAnswerTypeInsideRowRow 
    const rowTypeURI = 'http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy';
    const rowRowTypeURI = 'http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Location';
    const answerType = 'http://vital.ai/haley.ai/harbor-saas/HaleyAnswerType/NamedInsured_Street_1';
    const rowInstanceCounter = 'AB'; // the second instance of rowType
    const rowRowInstanceCounter = 'AA';
    const value = '540 Grand street';
    groupAPI.setValueByAnswerTypeInsideRowRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType, value)

    // getValueByAnswerTypeInsideRowRow
    const value = groupAPI.setValueByAnswerTypeInsideRowRow(qaObjects, qaInstanceObjects, rowInstanceCounter, rowType, rowRowInstanceCounter, rowRowType, answerType);

    // getRowInstanceCountersByRowType
    const rowTypeURI = 'http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy';
    const counters = groupAPI.getRowInstanceCountersByRowType(qaObjects, qaInstanceObjects, rowTypeURI); // ['AA', 'AB', 'AC', ...];

    // getRowRowInstanceCountersByRowRowType
    const rowTypeURI = 'http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Policy';
    const rowRowTypeURI = 'http://vital.ai/ontology/haley-ai-question#RowType_Harbor_Location';
    const rowInstanceCounter = 'AB'; // the second instance of rowType
    const counters = groupAPI.getRowRowInstanceCountersByRowRowType(qaObjects, qaInstanceObjects, rowTypeURI, rowInstanceCounter, rowRowTypeURI); // ['AA', 'AB', 'AC', ...];

    // created Row instance qa objects
    // argument rowInstanceCounter will be optional, if not provided, it will incremented as 'AA', 'AB', .... 'ZZ'.
    const createdInstances = groupAPI.createRowQaInstancesByRowType(qaObjects, qaInstanceObjects, rowTypeURI, rowInstanceCounter);
    qaInstanceObjects = [...qaInstanceObjects, ...createdInstances];

    // addRowQaInstancesByRowType directly update to qaInstanceObjects;
    // argument rowInstanceCounter will be optional, if not provided, it will incremented as 'AA', 'AB', .... 'ZZ'.
    groupAPI.addRowQaInstancesByRowType(qaObjects, qaInstanceObjects, rowTypeURI, rowInstanceCounter);

    // removeRowQaInstancesByRowTypeAndInstanceCounter
    const updatedQaInstanceObjects = groupAPI.removeRowQaInstancesByRowTypeAndInstanceCounter(qaObjects, qaInstanceObjects, rowTypeURI, rowInstanceCounter);

```
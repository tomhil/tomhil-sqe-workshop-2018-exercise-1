import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {assert.equal(JSON.stringify(parseCode('')), '[]');});
    it('test1', () => {assert.equal(JSON.stringify(parseCode('let x; \n let x =5;' ,null,0)), '[{"line":1,"Type":"VariableDeclaration","name":"x","condition":"","value":""},{"line":2,"Type":"VariableDeclaration","name":"x","condition":"","value":"5"}]');
    });
    it('test2', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(X, V, n){\n' + '   let sss;\n' + '    for( let i=0 ; i< n ; i++){\n' + 'let aa,e ;\n' + '\n' + '}\n' + '}\n',null,0)), '[{"line":1,"Type":"FunctionDeclaration","name":"binarySearch","condition":"","value":""},{"line":1,"Type":"variable declaration","name":"X","condition":"","value":""},{"line":1,"Type":"variable declaration","name":"V","condition":"","value":""},{"line":1,"Type":"variable declaration","name":"n","condition":"","value":""},{"line":2,"Type":"VariableDeclaration","name":"sss","condition":"","value":""},{"line":3,"Type":"ForStatement","name":"","condition":"i< n","value":""},{"line":3,"Type":"VariableDeclaration","name":"i","condition":"","value":"0"},{"line":3,"Type":"UpdateExpression","name":"i","condition":"","value":"i+1"},{"line":4,"Type":"VariableDeclaration","name":"aa","condition":"","value":""},{"line":4,"Type":"VariableDeclaration","name":"e","condition":"","value":""}]');});
    it('test3- whiile test', () => {assert.equal(JSON.stringify(parseCode(test3() ,null,0)), '[{"line":1,"Type":"FunctionDeclaration","name":"binarySearch","condition":"","value":""},{"line":1,"Type":"variable declaration","name":"X","condition":"","value":""},{"line":1,"Type":"variable declaration","name":"V","condition":"","value":""},{"line":1,"Type":"variable declaration","name":"n","condition":"","value":""},{"line":2,"Type":"VariableDeclaration","name":"low","condition":"","value":""},{"line":2,"Type":"VariableDeclaration","name":"high","condition":"","value":""},{"line":2,"Type":"VariableDeclaration","name":"mid","condition":"","value":""},{"line":3,"Type":"AssignmentExpression","name":"low","condition":"","value":"0"},{"line":3,"Type":"AssignmentExpression","name":"high","condition":"","value":"7"},{"line":4,"Type":"AssignmentExpression","name":"high","condition":"","value":"n - 1"},{"line":5,"Type":"AssignmentExpression","name":"mid","condition":"","value":"(low + high)/2"},{"line":6,"Type":"IfStatement","name":"","condition":"X < V[mid]","value":""},{"line":7,"Type":"AssignmentExpression","name":"high","condition":"","value":"mid - 1"},{"line":8,"Type":"elseif statement","name":"","condition":"X > V[mid]","value":""},{"line":9,"Type":"AssignmentExpression","name":"low","condition":"","value":"mid + 1"},{"line":11,"Type":"ReturnStatement","name":"","condition":"","value":"mid"},{"line":12,"Type":"ReturnStatement","name":"","condition":"","value":"-1"},{"line":14,"Type":"FunctionDeclaration","name":"binarySearch","condition":"","value":""},{"line":14,"Type":"variable declaration","name":"X","condition":"","value":""},{"line":14,"Type":"variable declaration","name":"V","condition":"","value":""},{"line":14,"Type":"variable declaration","name":"n","condition":"","value":""},{"line":15,"Type":"WhileStatement","name":"","condition":"low <= high","value":""},{"line":16,"Type":"IfStatement","name":"","condition":"x<y","value":""},{"line":17,"Type":"UpdateExpression","name":"z","condition":"","value":"z+1"},{"line":21,"Type":"FunctionDeclaration","name":"s","condition":"","value":""},{"line":23,"Type":"FunctionDeclaration","name":"binarySearch","condition":"","value":""},{"line":23,"Type":"variable declaration","name":"X","condition":"","value":""},{"line":23,"Type":"variable declaration","name":"V","condition":"","value":""},{"line":23,"Type":"variable declaration","name":"n","condition":"","value":""},{"line":24,"Type":"WhileStatement","name":"","condition":"low <= high","value":""},{"line":25,"Type":"IfStatement","name":"","condition":"x<y","value":""}]');});
    it('test4 - empty for', () => {assert.equal(JSON.stringify(parseCode(test4() ,null,0)), sol4());
    });
    it('test5 - for test and sequence', () => {assert.equal(JSON.stringify(parseCode(test5() ,null,0)), sol5());
    });
    it('test6 - if cases ', () => {assert.equal(JSON.stringify(parseCode(test6() ,null,0)), sol6());
    });
    it('test7 - example ', () => {assert.equal(JSON.stringify(parseCode(test7() ,null,0)), sol7());});
    it('test8 - for cases ', () => {assert.equal(JSON.stringify(parseCode(test8() ,null,0)), sol8());});
    it('test9 - test empty if with no alternate ', () => {assert.equal(JSON.stringify(parseCode(test9() ,null,0)), sol9());});
    it('test10 - test empty  while ', () => {assert.equal(JSON.stringify(parseCode(test10() ,null,0)), sol10());});

});

const  test3 =()=> {
    return 'function binarySearch(X, V, n){\n' +
        '    let low, high, mid;\n' +
        '    low = 0,high=7;\n' +
        '    high = n - 1;\n' +
        '        mid = (low + high)/2;\n' +
        '        if (X < V[mid])\n' +
        '            high = mid - 1;\n' +
        '        else if (X > V[mid])\n' +
        '            low = mid + 1;\n' +
        '        else\n' +
        '            return mid;   \n' +
        '    return -1;\n' +
        '}\n' +
        'function binarySearch(X, V, n){   \n' +
        '    while (low <= high) {\n' +
        '        if(x<y){\n' +
        'z++;\n' +
        '}\n' + '}\n' + '}\n' + 'function s(){  \n' + '}\n' + 'function binarySearch(X, V, n){\n' + '    while (low <= high) {\n' + '        if(x<y){\n' + '}\n' + '}\n' + '}' ;
};

const test4= () => {
    return 'function binarySearch(){\n' +
        '    for(;;){}\n' +
        '}\n' ;
};
const sol4 = () => {
    return '[{"line":1,"Type":"FunctionDeclaration","name":"binarySearch","condition":"","value":""},{"line":2,"Type":"ForStatement","name":"","condition":"","value":""}]';
};

const test5 = () =>{
    return 'let x= 5;\n' +
        'function fun2(X){\n' +
        '   let sss;\n' +
        'a++,q=7;\n' +
        'x++,d++;\n' +
        '    for( let i=0 ; i< n ; i++){\n' +
        'let aa,e ;\n' +
        '\n' +
        '}\n' +
        '\n' +
        'if (X < V[mid])\n' +
        '            high = mid - 1;\n' +
        '        else if (X > V[mid])\n' +
        '            low = mid + 1;\n' +
        '        else\n' +
        '            return mid;\n' + '    \n' + '    if(x>0){\n' + '}\n' + '}';
};

const sol5 = () =>{
    return '[{"line":1,"Type":"VariableDeclaration","name":"x","condition":"","value":"5"},{"line":2,"Type":"FunctionDeclaration","name":"fun2","condition":"","value":""},{"line":2,"Type":"variable declaration","name":"X","condition":"","value":""},{"line":3,"Type":"VariableDeclaration","name":"sss","condition":"","value":""},{"line":4,"Type":"UpdateExpression","name":"a","condition":"","value":"a+1"},{"line":4,"Type":"AssignmentExpression","name":"q","condition":"","value":"7"},{"line":5,"Type":"UpdateExpression","name":"x","condition":"","value":"x+1"},{"line":5,"Type":"UpdateExpression","name":"d","condition":"","value":"d+1"},{"line":6,"Type":"ForStatement","name":"","condition":"i< n","value":""},{"line":6,"Type":"VariableDeclaration","name":"i","condition":"","value":"0"},{"line":6,"Type":"UpdateExpression","name":"i","condition":"","value":"i+1"},{"line":7,"Type":"VariableDeclaration","name":"aa","condition":"","value":""},{"line":7,"Type":"VariableDeclaration","name":"e","condition":"","value":""},{"line":11,"Type":"IfStatement","name":"","condition":"X < V[mid]","value":""},{"line":12,"Type":"AssignmentExpression","name":"high","condition":"","value":"mid - 1"},{"line":13,"Type":"elseif statement","name":"","condition":"X > V[mid]","value":""},{"line":14,"Type":"AssignmentExpression","name":"low","condition":"","value":"mid + 1"},{"line":16,"Type":"ReturnStatement","name":"","condition":"","value":"mid"},{"line":18,"Type":"IfStatement","name":"","condition":"x>0","value":""}]';
};
const test6 = () =>{
    return 'let x =5 +(dwdwdw +3 *2);\n' +
        'function a () {\n' +
        '}\n' +
        '\n' +
        'function b (x) {\n' +
        '\n' +
        '}\n' +
        '\n' +
        '\n' +
        'function c () {\n' +
        'let y=5;\n' +
        'y++; let qq;\n' +
        '\n' +
        '}\n' +
        '\n' +
        '\n' +
        'function d () {\n' +
        'if(x==1){\n' + '}\n' + '\n' + ' if (x==2)\n' + '            high = mid - 1;\n' + '        else if (x==3)\n' + '            low = mid + 1;\n' + '        else\n' + '            return mid;\n' + '\n' + 'if(x==4){\n' + '}\n' + 'else{}\n' + '\n' + '}';
};

const sol6 = () => {
    return '[{"line":1,"Type":"VariableDeclaration","name":"x","condition":"","value":"5 +(dwdwdw +3 *2)"},{"line":2,"Type":"FunctionDeclaration","name":"a","condition":"","value":""},{"line":5,"Type":"FunctionDeclaration","name":"b","condition":"","value":""},{"line":5,"Type":"variable declaration","name":"x","condition":"","value":""},{"line":10,"Type":"FunctionDeclaration","name":"c","condition":"","value":""},{"line":11,"Type":"VariableDeclaration","name":"y","condition":"","value":"5"},{"line":12,"Type":"UpdateExpression","name":"y","condition":"","value":"y+1"},{"line":12,"Type":"VariableDeclaration","name":"qq","condition":"","value":""},{"line":17,"Type":"FunctionDeclaration","name":"d","condition":"","value":""},{"line":18,"Type":"IfStatement","name":"","condition":"x==1","value":""},{"line":21,"Type":"IfStatement","name":"","condition":"x==2","value":""},{"line":22,"Type":"AssignmentExpression","name":"high","condition":"","value":"mid - 1"},{"line":23,"Type":"elseif statement","name":"","condition":"x==3","value":""},{"line":24,"Type":"AssignmentExpression","name":"low","condition":"","value":"mid + 1"},{"line":26,"Type":"ReturnStatement","name":"","condition":"","value":"mid"},{"line":28,"Type":"IfStatement","name":"","condition":"x==4","value":""}]';
};

const test7 = () =>{
    return 'function binarySearch(X, V, n){\n' +
        '    let low, high, mid;\n' +
        '    low = 0;\n' +
        '    high = n - 1;\n' +
        '    while (low <= high) {\n' +
        '        mid = (low + high)/2;\n' +
        '        if (X < V[mid])\n' +
        '            high = mid - 1;\n' +
        '        else if (X > V[mid])\n' +
        '            low = mid + 1;\n' +
        '        else\n' +
        '            return mid;\n' +
        '    }\n' +
        '    return -1;\n' +
        '}' ;
};

const sol7 =()=>{
    return'[{"line":1,"Type":"FunctionDeclaration","name":"binarySearch","condition":"","value":""},{"line":1,"Type":"variable declaration","name":"X","condition":"","value":""},{"line":1,"Type":"variable declaration","name":"V","condition":"","value":""},{"line":1,"Type":"variable declaration","name":"n","condition":"","value":""},{"line":2,"Type":"VariableDeclaration","name":"low","condition":"","value":""},{"line":2,"Type":"VariableDeclaration","name":"high","condition":"","value":""},{"line":2,"Type":"VariableDeclaration","name":"mid","condition":"","value":""},{"line":3,"Type":"AssignmentExpression","name":"low","condition":"","value":"0"},{"line":4,"Type":"AssignmentExpression","name":"high","condition":"","value":"n - 1"},{"line":5,"Type":"WhileStatement","name":"","condition":"low <= high","value":""},{"line":6,"Type":"AssignmentExpression","name":"mid","condition":"","value":"(low + high)/2"},{"line":7,"Type":"IfStatement","name":"","condition":"X < V[mid]","value":""},{"line":8,"Type":"AssignmentExpression","name":"high","condition":"","value":"mid - 1"},{"line":9,"Type":"elseif statement","name":"","condition":"X > V[mid]","value":""},{"line":10,"Type":"AssignmentExpression","name":"low","condition":"","value":"mid + 1"},{"line":12,"Type":"ReturnStatement","name":"","condition":"","value":"mid"},{"line":14,"Type":"ReturnStatement","name":"","condition":"","value":"-1"}]';
};

const test8 = () =>{
    return 'function forTest (){\n' +
        'for(;;){}\n' +
        'for(let i=0;;){}\n' +
        'for(;i<r;i++){}\n' +
        'for(;i<s;){}\n' +
        'for(;;){let x;}\n' +
        'for(let i=0;;){x=5;}\n' +
        'for(;i<r;i++){x++;}\n' +
        'for(;i<s;){let x=6,t=0;\n' +
        'x++,y=y+7;}\n' +
        '}';
};

const  sol8 = () => {
    return '[{"line":1,"Type":"FunctionDeclaration","name":"forTest","condition":"","value":""},{"line":2,"Type":"ForStatement","name":"","condition":"","value":""},{"line":3,"Type":"ForStatement","name":"","condition":"","value":""},{"line":3,"Type":"VariableDeclaration","name":"i","condition":"","value":"0"},{"line":4,"Type":"ForStatement","name":"","condition":"i<r","value":""},{"line":4,"Type":"UpdateExpression","name":"i","condition":"","value":"i+1"},{"line":5,"Type":"ForStatement","name":"","condition":"i<s","value":""},{"line":6,"Type":"ForStatement","name":"","condition":"","value":""},{"line":6,"Type":"VariableDeclaration","name":"x","condition":"","value":""},{"line":7,"Type":"ForStatement","name":"","condition":"","value":""},{"line":7,"Type":"VariableDeclaration","name":"i","condition":"","value":"0"},{"line":7,"Type":"AssignmentExpression","name":"x","condition":"","value":"5"},{"line":8,"Type":"ForStatement","name":"","condition":"i<r","value":""},{"line":8,"Type":"UpdateExpression","name":"i","condition":"","value":"i+1"},{"line":8,"Type":"UpdateExpression","name":"x","condition":"","value":"x+1"},{"line":9,"Type":"ForStatement","name":"","condition":"i<s","value":""},{"line":9,"Type":"VariableDeclaration","name":"x","condition":"","value":"6"},{"line":9,"Type":"VariableDeclaration","name":"t","condition":"","value":"0"},{"line":10,"Type":"UpdateExpression","name":"x","condition":"","value":"x+1"},{"line":10,"Type":"AssignmentExpression","name":"y","condition":"","value":"y+7"}]';
};

const test9 = () =>{
    return '\n if(x==3){\n' +
      '}\n';
};

const  sol9 =() =>{
    return '[{"line":2,"Type":"IfStatement","name":"","condition":"x==3","value":""}]';
};

const test10 = () =>{
    return 'function y (x,z){\n' +
        'let q =7;\n' +
        'while(x>1){\n' +
        'x--,z++,q=q+2;\n' +
        'if(x<5){\n' +
        'return q;\n' +
        '}\n' +
        '}\n' +
        '}\n' +
        '\n' +
        'function v (x,z){\n' +
        'while(x===1){}\n' +
        '}';
};

const  sol10 = ()=>{
    return '[{"line":1,"Type":"FunctionDeclaration","name":"y","condition":"","value":""},{"line":1,"Type":"variable declaration","name":"x","condition":"","value":""},{"line":1,"Type":"variable declaration","name":"z","condition":"","value":""},{"line":2,"Type":"VariableDeclaration","name":"q","condition":"","value":"7"},{"line":3,"Type":"WhileStatement","name":"","condition":"x>1","value":""},{"line":4,"Type":"UpdateExpression","name":"x","condition":"","value":"x-1"},{"line":4,"Type":"UpdateExpression","name":"z","condition":"","value":"z+1"},{"line":4,"Type":"AssignmentExpression","name":"q","condition":"","value":"q+2"},{"line":5,"Type":"IfStatement","name":"","condition":"x<5","value":""},{"line":6,"Type":"ReturnStatement","name":"","condition":"","value":"q"},{"line":11,"Type":"FunctionDeclaration","name":"v","condition":"","value":""},{"line":11,"Type":"variable declaration","name":"x","condition":"","value":""},{"line":11,"Type":"variable declaration","name":"z","condition":"","value":""},{"line":12,"Type":"WhileStatement","name":"","condition":"x===1","value":""}]';
};
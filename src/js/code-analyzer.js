import * as esprima from 'esprima';
let StringCode='' ;

const parseCode = (codeToParse) => {
    StringCode= codeToParse;
    return  ParsedCodeJS(esprima.parseScript(codeToParse,{loc :true}));
    //return esprima.parseScript(codeToParse,{loc :true}) ;
};


const  concats = (lst1,lst2) => {

    lst2.forEach(function (ele) {
        lst1.push(ele);

    });
    return lst1 ;
};


const ParsedCodeJS = (code)=>{
    let ll ;
    ll= ftype(code.type)(code);
    return ll;
};

const Extract_function = (code) =>{
    let listd = [];
    listd.push({line :code.loc.start.line, Type:code.type,name:code.id.name, condition: '',value:''});

    code.params .forEach(function (element) {
        listd.push({line :element.loc.start.line ,Type:'variable declaration',name:element.name,condition: '' , value:''});
    });
    //return listd;
    listd=concats(listd,ParsedCodeJS(code.body));
    return listd;
};

const Extract_blockStatment= (code) =>{
    let list =[];
    let lst=[];
    code.body.forEach(function (element) {
        //lst = concats(lst,ParsedCodeJS(element));
        lst =lst.concat( ParsedCodeJS(element));
        //lst=lst.push(par);
    });
    list = concats(list,lst);
    return list;

};


const Extract_varDecl = (code) =>{
    let listd = [] ;
    code.declarations.forEach(function (element) {
        listd.push(Extract_varDeclaretor(element));
    });
    return listd;
};


const Extract_varDeclaretor = (code ) =>{
    return {line: code.loc.start.line,Type:'VariableDeclaration' , name:code.id.name,condition: '',value:get_value(code.init)};
};

const Extract_assignmentExpr = (code) =>{

    return [{line:code.loc.start.line,Type:code.type,name:code.left.name,condition:'',value:get_value(code.right)}] ;

};

const get_value = (code) =>{
    if(code === null){
        return '';
    }else {

        let line = code.loc.start.line;
        let columnS = code.loc.start.column;
        let columnE = code.loc.end.column;
        let strings = StringCode;
        while (line > 1) {
            line--;
            strings = strings.substring(strings.indexOf('\n') + 1);
        }
        return strings.substring(columnS, columnE);
    }
};

const Extract_while = (code) =>{
    let listd = [] ;
    let decl = {line: code.loc.start.line,Type:code.type,name:'',condition:get_value(code.test),value:''};
    listd=listd.concat(decl);
    listd=listd.concat(ParsedCodeJS(code.body));
    return listd ;
};

const Extract_if = (code) =>{
    let listd = [] ;
    listd.push( {line: code.loc.start.line,Type:code.type,name:'',condition:get_value(code.test),value:''});
    listd=listd.concat(ParsedCodeJS(code.consequent));
    if(code.alternate === null){
        return listd;
    }else
    if(code.alternate.type === 'IfStatement'){
        listd.push( {line: code.alternate.loc.start.line,Type:'elseif statement',name:'',condition:get_value(code.alternate.test),value:''});
        listd=listd.concat(ParsedCodeJS(code.alternate.consequent));
        listd=listd.concat(ParsedCodeJS(code.alternate.alternate));
        return listd;
    }else {
        listd = listd.concat(ParsedCodeJS(code.alternate));
        return listd;
    }
};

const Extract_return = (code) =>{

    return  {line: code.loc.start.line,Type:code.type,name:'',condition:'',value:get_value(code.argument)};

};

const Extract_update = (code) =>{
    let  val =(code.argument.name.concat(code.operator.charAt(0))).concat('1');
    return  [{line: code.loc.start.line,Type:code.type,name:code.argument.name,condition:'',value:val}];
} ;

const Extract_for = (code) =>{
    let listd = [] ;
    let decl =  {line: code.loc.start.line,Type:code.type,name:'',condition:get_value(code.test),value:''};
    listd=listd.concat(decl);
    if(code.init != null){
        listd=listd.concat(ParsedCodeJS(code.init));
    }
    if(code.update != null){
        listd=listd.concat(Extract_Update_For(code.update));
    }
    listd=listd.concat(ParsedCodeJS(code.body));
    return listd ;
};


const Extract_program =  (code) =>{
    let listd =[];
    // return listd;
    code.body.forEach(function (element) {
        //listd.push( ParsedCodeJS(element));
        listd= concats(listd , ParsedCodeJS(element));
    });
    return listd;
};

const Extract_exprssionstatment = (code) =>{

    if (code.expression.type === 'AssignmentExpression')
        return  Extract_assignmentExpr (code.expression);
    if(code.expression.type === 'UpdateExpression')
        return Extract_update(code.expression);
    // if(code.expression.type === 'SequenceExpression')
    return Extract_sequence(code.expression);
};

const Extract_sequence = (code) =>{
    let lst = [];
    code.expressions.forEach(function (element) {
        if (element.type === 'AssignmentExpression')
            lst = lst.concat( Extract_assignmentExpr (element));
        if(element.type === 'UpdateExpression')
            lst= lst.concat( Extract_update(element));
    });
    return lst ;
};
const Extract_Update_For= (code) =>{
    if (code.type === 'AssignmentExpression')
        return Extract_assignmentExpr (code);
    // if(code.type === 'UpdateExpression')
    return Extract_update(code);
};


const   ftype =(type) => {
    let arrfunc = [];
    arrfunc['FunctionDeclaration'] = Extract_function;
    arrfunc['BlockStatement'] = Extract_blockStatment;
    arrfunc['VariableDeclaration'] = Extract_varDecl;
    arrfunc['ExpressionStatement'] = Extract_exprssionstatment;
    arrfunc['WhileStatement'] = Extract_while;
    arrfunc['IfStatement'] = Extract_if;
    arrfunc['ReturnStatement'] = Extract_return;
    arrfunc['ForStatement'] = Extract_for;
    arrfunc['Program'] = Extract_program;
    return  arrfunc[type];

};
export {parseCode};

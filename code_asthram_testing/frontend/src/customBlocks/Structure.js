import Blockly from 'blockly';
import 'blockly/python';

Blockly.Blocks['base_structure'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("setup");
      this.appendStatementInput("SETUP")
          .setCheck(null)
          .appendField("");
      this.appendDummyInput()
          .appendField("loop");
      this.appendStatementInput("LOOP")
          .setCheck(null)
          .appendField("");
      this.setColour("#AEC6CF");
      this.setTooltip("Base structure with setup and loop functions");
      this.setHelpUrl("");
    }
  };
  
  Blockly.Python['base_structure'] = function(block) {
    var setupCode = Blockly.Python.statementToCode(block, 'SETUP');
    var loopCode = Blockly.Python.statementToCode(block, 'LOOP');
  
    var code = '';
    code += 'def setup():\n';
    code += setupCode;
    code += '\n\n';
  
    code += 'def loop():\n';
    code += loopCode;
    code += '\n';
  
    return code;
  };

  
  Blockly.Blocks['declaration_structure'] = {
    init: function() {
      this.appendStatementInput("DECLARATIONS")
          .setCheck(null)
          .appendField("Declare:");
      this.setColour("#AEC6CF");
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Python['declaration_structure'] = function(block) {
    var statements_declarations = Blockly.Python.statementToCode(block, 'DECLARATIONS');
    // Assemble Python code into code variable.
    var code = 'def declarations():\n' + statements_declarations;
    return code;
  };
  
  Blockly.Blocks['custom_yield'] = {
    init: function() {
    this.appendDummyInput()
    .appendField("yield");
    this.appendStatementInput("NAME")
    .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#AEC6CF");
    this.setTooltip("");
    this.setHelpUrl("");
    }
    };

    Blockly.Python['custom_yield'] = function(block) {
        var statements_name = Blockly.Python.statementToCode(block, 'NAME');
        // As 'yield' is a reserved keyword in Python, you might want to use a different function name
        var code = 'def custom_yield():\n' +
        statements_name;
        return code;
        };

        Blockly.Blocks['if_else_structure'] = {
            init: function() {
              this.appendValueInput('CONDITION')
                  .setCheck('Boolean')
                  .appendField('if');
              this.appendStatementInput('IF_STATEMENTS')
                  .setCheck(null)
                  .appendField('then');
              this.appendDummyInput()
                  .appendField('else');
              this.appendStatementInput('ELSE_STATEMENTS')
                  .setCheck(null);
              this.setColour("#AEC6CF");
              this.setTooltip('Create an if-else structure with conditionals.');
            }
          };

          Blockly.Python['if_else_structure'] = function(block) {
            var condition = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_ATOMIC);
            var ifStatements = Blockly.Python.statementToCode(block, 'IF_STATEMENTS');
            var elseStatements = Blockly.Python.statementToCode(block, 'ELSE_STATEMENTS');
            var code = `if ${condition}:\n${ifStatements}\nelse:\n${elseStatements}`;
            return code;
          };
          
          Blockly.Blocks['dynamic_for_loop'] = {
            init: function() {
              this.appendDummyInput()
                  .appendField("for")
                  .appendField(new Blockly.FieldVariable("i"), "VAR")
                  .appendField("in range(");
              this.appendValueInput("START")
                  .setCheck("Number")
                  .appendField("start");
              this.appendValueInput("END")
                  .setCheck("Number")
                  .appendField("end");
              this.appendValueInput("STEP")
                  .setCheck("Number")
                  .appendField("step");
              this.appendDummyInput()
                  .appendField(")");
              this.appendStatementInput("DO")
                  .setCheck(null)
                  .appendField("do");
              this.setPreviousStatement(true, null);
              this.setNextStatement(true, null);
              this.setColour('#AEC6CF');
              this.setTooltip("For loop with configurable range");
              this.setHelpUrl("");
            }
          };
          
          
          Blockly.Python['dynamic_for_loop'] = function(block) {
            var variable = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
            var start = Blockly.Python.valueToCode(block, 'START', Blockly.Python.ORDER_NONE) || '0';
            var end = Blockly.Python.valueToCode(block, 'END', Blockly.Python.ORDER_NONE) || '0';
            var step = Blockly.Python.valueToCode(block, 'STEP', Blockly.Python.ORDER_NONE) || '1';
          
            // Build the range function based on what inputs are provided
            var rangeArgs = [start, end];
            if (step) rangeArgs.push(step);
          
            var argumentsString = rangeArgs.join(', ');
          
            var code = 'for ' + variable + ' in range(' + argumentsString + '):\n';
            var branch = Blockly.Python.statementToCode(block, 'DO');
            if (Blockly.Python.STATEMENT_PREFIX) {
              branch = Blockly.Python.prefixLines(Blockly.Python.STATEMENT_PREFIX.replace(/%1/g,
                  '\'' + block.id + '\''), Blockly.Python.INDENT) + branch;
            }
            if (Blockly.Python.INFINITE_LOOP_TRAP) {
              branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,
                  '\'' + block.id + '\'') + branch;
            }
            code += branch || Blockly.Python.PASS;
            return code;
          };
          
          
          
          Blockly.Blocks['while_loop_structure'] = {
            init: function () {
                this.appendValueInput('CONDITION')
                    .setCheck('Boolean')
                    .appendField('while');
                this.appendStatementInput('STATEMENTS')
                    .setCheck(null)
                    .appendField('do');
                this.setPreviousStatement(true, null); // Allow connections from above
                this.setNextStatement(true, null); // Allow connections to below
                this.setColour("#AEC6CF");
                this.setTooltip('Create a while loop structure with specified condition.');
            }
        };
        
        Blockly.Python['while_loop_structure'] = function (block) {
            var condition = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_ATOMIC);
            var statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
            var code = `while ${condition}:\n${statements}`;
            return code;
        };
        
          
          Blockly.Blocks['function_definition_structure'] = {
            init: function() {
              this.appendDummyInput()
                  .appendField('def')
                  .appendField(new Blockly.FieldTextInput('functionName'), 'FUNCTION_NAME')
                  .appendField('(');
              this.appendValueInput('PARAMS')
                  .setCheck('String')
                  .appendField('');
              this.appendDummyInput()
                  .appendField('):');
              this.appendStatementInput('STATEMENTS')
                  .setCheck(null);
              this.setColour("#AEC6CF");
              this.setTooltip('Create a structure for defining a function with parameters and statements.');
              this.setPreviousStatement(true, null); // Add top connection bump
              this.setNextStatement(true, null); // Ensure bottom connection bump is retained
            }
          };

          Blockly.Python['function_definition_structure'] = function(block) {
            var functionName = block.getFieldValue('FUNCTION_NAME');
            var params = Blockly.Python.valueToCode(block, 'PARAMS', Blockly.Python.ORDER_ATOMIC) || '';
            var statements = Blockly.Python.statementToCode(block, 'STATEMENTS', Blockly.Python.ORDER_FUNCTION_CALL);
            var code = `def ${functionName}(${params}):\n${statements}`;
            if (statements.trim() === "") {
              code += "    pass\n";  // Add pass if function body is empty
            }
            return code;
          };
          

          Blockly.Blocks['try_catch_structure'] = {
            init: function() {
              this.appendDummyInput()
                  .appendField('try:');
              this.appendStatementInput('TRY_STATEMENTS')
                  .setCheck(null);
              this.appendDummyInput()
                  .appendField('except Exception as e:');
              this.appendStatementInput('EXCEPT_STATEMENTS')
                  .setCheck(null);
              this.setColour("#AEC6CF");
              this.setTooltip('Create a structure for handling exceptions with try and catch blocks.');
            }
          };

          Blockly.Python['try_catch_structure'] = function(block) {
            var tryStatements = Blockly.Python.statementToCode(block, 'TRY_STATEMENTS');
            var exceptStatements = Blockly.Python.statementToCode(block, 'EXCEPT_STATEMENTS');
            var code = `try:\n${tryStatements}\nexcept Exception as e:\n${exceptStatements}`;
            return code;
          };
          
          Blockly.Blocks['switch_case_structure'] = {
            init: function() {
              this.appendDummyInput()
                  .appendField('switch');
              this.appendValueInput('VALUE')
                  .setCheck(null);
              this.appendStatementInput('CASES')
                  .setCheck(null)
                  .appendField('cases');
              this.setColour("#AEC6CF");
              this.setTooltip('Create a structure for implementing switch-case logic.');
            }
          };

          Blockly.Python['switch_case_structure'] = function(block) {
            var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
            var cases = Blockly.Python.statementToCode(block, 'CASES');
            var code = `switch ${value}:\n${cases}`;
            return code;
          };
          
          Blockly.Blocks['do_while_loop_structure'] = {
            init: function() {
              this.appendDummyInput()
                  .appendField('do');
              this.appendStatementInput('STATEMENTS')
                  .setCheck(null);
              this.appendDummyInput()
                  .appendField('while');
              this.appendValueInput('CONDITION')
                  .setCheck('Boolean');
              this.setColour("#AEC6CF");
              this.setPreviousStatement(true, null);
              this.setNextStatement(true, null);
              this.setTooltip('Create a structure for a do-while loop.');
            }
          };

          Blockly.Python['do_while_loop_structure'] = function(block) {
            var statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
            var condition = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_ATOMIC);
            var code = `while True:\n${statements}\n  if not ${condition}:\n    break\n`;
            return code;
          };

          Blockly.Blocks['break_statement'] = {
            init: function() {
              this.appendDummyInput()
                  .appendField("break");
              this.setPreviousStatement(true, null);
              this.setNextStatement(true, null);
              this.setColour('#AEC6CF');
              this.setTooltip("Break out of the current loop");
              this.setHelpUrl("https://docs.python.org/3/reference/simple_stmts.html#break");
            }
          };
          Blockly.Python['break_statement'] = function(block) {
            // Python's 'break' statement
            return 'break\n';
          };
                    
          
          Blockly.Blocks['class_structure'] = {
            init: function() {
              this.appendDummyInput()
                  .appendField('class')
                  .appendField(new Blockly.FieldTextInput('ClassName'), 'CLASS_NAME')
                  .appendField(':');
              this.appendStatementInput('ATTRIBUTES')
                  .setCheck(null)
                  .appendField('Attributes');
              this.appendStatementInput('METHODS')
                  .setCheck(null)
                  .appendField('Methods');
              this.setColour("#AEC6CF");
              this.setTooltip('Create a structure for defining a class with methods and attributes.');
            }
          };
          
          Blockly.Python['class_structure'] = function(block) {
            var className = block.getFieldValue('CLASS_NAME');
            var attributes = Blockly.Python.statementToCode(block, 'ATTRIBUTES');
            var methods = Blockly.Python.statementToCode(block, 'METHODS');
            var code = `class ${className}:\n${attributes}${methods}`;
            return code;
          };
          
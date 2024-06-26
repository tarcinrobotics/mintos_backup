import Blockly from "blockly";
import "blockly/python";

Blockly.Blocks["cv2_readimage"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Read image:")
      .appendField(new Blockly.FieldVariable("image_file"), "var_name");
    this.appendValueInput("image_name").setCheck("String").appendField("File");
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["Color image", "1"],
        ["Grayscale mode", "0"],
        ["Unchanged (including alpha channel)", "-1"],
      ]),
      "NAME"
    );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_readimage"] = function (block) {
  var value_image_name = Blockly.Python.valueToCode(
    block,
    "image_name",
    Blockly.Python.ORDER_ATOMIC
  );
  var dropdown_name = block.getFieldValue("NAME");
  var variable_var_name = Blockly.Python.variableDB_.getName(
    block.getFieldValue("var_name"),
    Blockly.Variables.NAME_TYPE
  );
  // TODO: Assemble Python into code variable.

  Blockly.Python.definitions_["cv2"] = "import cv2 as cv";
  Blockly.Python.definitions_["numpy"] = "import numpy as np\n";
  //img = cv.imread('messi5.jpg',0)
  var code =
    variable_var_name +
    " =  cv.imread(" +
    value_image_name +
    "," +
    dropdown_name +
    ")\n";
  return code;
};

Blockly.Blocks["cv2_showimage"] = {
  init: function () {
    this.appendDummyInput().appendField("Show Image");
    this.appendDummyInput()
      .appendField("Image object")
      .appendField(new Blockly.FieldVariable("image_file"), "var_image");
    this.appendValueInput("image_window")
      .setCheck("String")
      .appendField("Image window");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_showimage"] = function (block) {
  var variable_var_image = Blockly.Python.variableDB_.getName(
    block.getFieldValue("var_image"),
    Blockly.Variables.NAME_TYPE
  );
  var value_image_window = Blockly.Python.valueToCode(
    block,
    "image_window",
    Blockly.Python.ORDER_ATOMIC
  );
  Blockly.Python.definitions_["cv2"] = "import cv2 as cv";
  Blockly.Python.definitions_["numpy"] = "import numpy as np";
  // TODO: Assemble Python into code variable.
  //cv.imshow('image',img)
  var code =
    "cv.imshow(" + value_image_window + "," + variable_var_image + ")\n";
  return code;
};

Blockly.Blocks["os_chdir"] = {
  init: function () {
    this.appendValueInput("path")
        .setCheck("String")
        .appendField("Change directory to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Change the current working directory to the specified path.");
    this.setColour("#6A5ACD"); // Purple color for consistency
    this.setHelpUrl(""); // URL to the documentation or help
  }
};

Blockly.Python["os_chdir"] = function (block) {
  var value_path = Blockly.Python.valueToCode(block, "path", Blockly.Python.ORDER_ATOMIC);
  
  Blockly.Python.definitions_["import_os"] = "import os";
  
  var code = "os.chdir(" + value_path + ")\n";
  return code;
};

Blockly.Blocks["os_listdir"] = {
  init: function () {
    this.appendValueInput("path")
        .setCheck("String")
        .appendField("List directory contents of");
    this.setOutput(true, "Array");
    this.setTooltip("Return a list containing the names of the entries in the directory given by the path.");
    this.setColour("#6A5ACD"); // Purple color for consistency
    this.setHelpUrl(""); // URL to the documentation or help
  }
};

Blockly.Python["os_listdir"] = function (block) {
  var value_path = Blockly.Python.valueToCode(block, "path", Blockly.Python.ORDER_ATOMIC);
  
  Blockly.Python.definitions_["import_os"] = "import os";
  
  var code = "os.listdir(" + value_path + ")";
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Blocks["cv2_add"] = {
  init: function () {
    this.appendValueInput("src1")
        .setCheck(null)
        .appendField("Add images");
    this.appendValueInput("src2")
        .setCheck(null)
        .appendField("and");
    this.appendValueInput("dst")
        .setCheck(null)
        .appendField("store result in");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Add two images together and store the result in the specified destination.");
    this.setColour("#6A5ACD"); // Purple color for consistency
    this.setHelpUrl(""); // URL to the documentation or help
  }
};

Blockly.Python["cv2_add"] = function (block) {
  var value_src1 = Blockly.Python.valueToCode(block, "src1", Blockly.Python.ORDER_ATOMIC);
  var value_src2 = Blockly.Python.valueToCode(block, "src2", Blockly.Python.ORDER_ATOMIC);
  var value_dst = Blockly.Python.valueToCode(block, "dst", Blockly.Python.ORDER_ATOMIC);
  
  Blockly.Python.definitions_["cv2"] = "import cv2 as cv";
  
  var code = "cv2.add(" + value_src1 + ", " + value_src2 + ", " + value_dst + ")";
  return code;
};

Blockly.Blocks["cv2_copy_make_border"] = {
  init: function () {
    this.appendValueInput("src")
        .setCheck(null)
        .appendField("Create border for image");
    this.appendValueInput("top")
        .setCheck(null)
        .appendField("Top");
    this.appendValueInput("bottom")
        .setCheck(null)
        .appendField("Bottom");
    this.appendValueInput("left")
        .setCheck(null)
        .appendField("Left");
    this.appendValueInput("right")
        .setCheck(null)
        .appendField("Right");
    this.appendDummyInput()
        .appendField("Border type")
        .appendField(new Blockly.FieldDropdown([
            ["Constant", "cv2.BORDER_CONSTANT"],
            ["Replicate", "cv2.BORDER_REPLICATE"],
            ["Reflect", "cv2.BORDER_REFLECT"],
            ["Reflect101", "cv2.BORDER_REFLECT_101"],
            ["Wrap", "cv2.BORDER_WRAP"]
        ]), "border_type");
    this.appendDummyInput()
        .appendField("Border color")
        .appendField(new Blockly.FieldColour("#ff0000"), "border_color");
    this.appendValueInput("dst")
        .setCheck(null)
        .appendField("Store result in");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Create a border around the input image with the specified size, type, and color.");
    this.setColour("#6A5ACD"); // Purple color for consistency
    this.setHelpUrl(""); // URL to the documentation or help
  }
};

Blockly.Python["cv2_copy_make_border"] = function (block) {
  var value_src = Blockly.Python.valueToCode(block, "src", Blockly.Python.ORDER_ATOMIC);
  var value_top = Blockly.Python.valueToCode(block, "top", Blockly.Python.ORDER_ATOMIC);
  var value_bottom = Blockly.Python.valueToCode(block, "bottom", Blockly.Python.ORDER_ATOMIC);
  var value_left = Blockly.Python.valueToCode(block, "left", Blockly.Python.ORDER_ATOMIC);
  var value_right = Blockly.Python.valueToCode(block, "right", Blockly.Python.ORDER_ATOMIC);
  var dropdown_border_type = block.getFieldValue("border_type");
  var colour_border_color = block.getFieldValue("border_color");
  var value_dst = Blockly.Python.valueToCode(block, "dst", Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["cv2"] = "import cv2 as cv";

  var code = "cv2.copyMakeBorder(" + value_src + ", " + value_top + ", " + value_bottom + ", " +
             value_left + ", " + value_right + ", " + dropdown_border_type + ", " +
             "value_dst, cv2.BORDER_CONSTANT, value=" + "'" + colour_border_color + "'" + ")";
  return code;
};

Blockly.Blocks["cv2_image_corner"] = {
  init: function () {
    this.appendValueInput("src")
        .setCheck(null)
        .appendField("Detect corners in image");
    this.appendValueInput("max_corners")
        .setCheck("Number")
        .appendField("Maximum number of corners to detect");
    this.appendValueInput("quality_level")
        .setCheck("Number")
        .appendField("Quality level");
    this.appendDummyInput()
        .appendField("Minimum distance")
        .appendField(new Blockly.FieldNumber(10, 0, Infinity, 1), "min_distance");
    this.appendDummyInput()
        .appendField("Block size")
        .appendField(new Blockly.FieldNumber(3, 3, Infinity, 1), "block_size");
    this.appendDummyInput()
        .appendField("Use Harris detector")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "use_harris");
    this.appendValueInput("k")
        .setCheck("Number")
        .appendField("Harris detector parameter k");
    this.appendDummyInput()
        .appendField("Store corner coordinates in")
        .appendField(new Blockly.FieldVariable("corners"), "corners");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Detect corners in the input image using the specified parameters and store the coordinates of detected corners.");
    this.setColour("#6A5ACD"); // Purple color for consistency
    this.setHelpUrl(""); // URL to the documentation or help
  }
};

Blockly.Python["cv2_image_corner"] = function (block) {
  var value_src = Blockly.Python.valueToCode(block, "src", Blockly.Python.ORDER_ATOMIC);
  var value_max_corners = Blockly.Python.valueToCode(block, "max_corners", Blockly.Python.ORDER_ATOMIC);
  var value_quality_level = Blockly.Python.valueToCode(block, "quality_level", Blockly.Python.ORDER_ATOMIC);
  var number_min_distance = block.getFieldValue("min_distance");
  var number_block_size = block.getFieldValue("block_size");
  var checkbox_use_harris = block.getFieldValue("use_harris") == "TRUE";
  var value_k = Blockly.Python.valueToCode(block, "k", Blockly.Python.ORDER_ATOMIC);
  var variable_corners = Blockly.Python.variableDB_.getName(block.getFieldValue("corners"), Blockly.Variables.NAME_TYPE);

  Blockly.Python.definitions_["cv2"] = "import cv2 as cv";

  var code = variable_corners + " = cv2.goodFeaturesToTrack(" + value_src + ", " + value_max_corners + ", " + value_quality_level + ", " +
             number_min_distance + ", " + number_block_size + ", useHarrisDetector=" + checkbox_use_harris + ", k=" + value_k + ")\n";
  return code;
};

Blockly.Blocks["cv2_gaussian_blur"] = {
  init: function () {
    this.appendValueInput("src")
        .setCheck(null)
        .appendField("Apply Gaussian blur to image");
    this.appendValueInput("ksize")
        .setCheck("Array")
        .appendField("Kernel size");
    this.appendValueInput("sigma_x")
        .setCheck("Number")
        .appendField("Sigma X");
    this.appendValueInput("sigma_y")
        .setCheck("Number")
        .appendField("Sigma Y");
    this.appendDummyInput()
        .appendField("Border type")
        .appendField(new Blockly.FieldDropdown([
            ["Constant", "cv2.BORDER_CONSTANT"],
            ["Replicate", "cv2.BORDER_REPLICATE"],
            ["Reflect", "cv2.BORDER_REFLECT"],
            ["Reflect101", "cv2.BORDER_REFLECT_101"],
            ["Wrap", "cv2.BORDER_WRAP"]
        ]), "border_type");
    this.appendDummyInput()
        .appendField("Border value")
        .appendField(new Blockly.FieldNumber(0), "border_value");
    this.appendValueInput("dst")
        .setCheck(null)
        .appendField("Store result in");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Apply Gaussian blur to the input image with the specified kernel size and standard deviations.");
    this.setColour("#6A5ACD"); // Purple color for consistency
    this.setHelpUrl(""); // URL to the documentation or help
  }
};

Blockly.Python["cv2_gaussian_blur"] = function (block) {
  var value_src = Blockly.Python.valueToCode(block, "src", Blockly.Python.ORDER_ATOMIC);
  var value_ksize = Blockly.Python.valueToCode(block, "ksize", Blockly.Python.ORDER_ATOMIC);
  var value_sigma_x = Blockly.Python.valueToCode(block, "sigma_x", Blockly.Python.ORDER_ATOMIC);
  var value_sigma_y = Blockly.Python.valueToCode(block, "sigma_y", Blockly.Python.ORDER_ATOMIC);
  var dropdown_border_type = block.getFieldValue("border_type");
  var number_border_value = block.getFieldValue("border_value");
  var value_dst = Blockly.Python.valueToCode(block, "dst", Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["cv2"] = "import cv2 as cv";

  var code = value_dst + " = cv2.GaussianBlur(" + value_src + ", " + value_ksize + ", " + value_sigma_x + ", " + value_sigma_y + ", " +
             "borderType=" + dropdown_border_type + ", " + "borderValue=" + number_border_value + ")\n";
  return code;
};

Blockly.Blocks["cv2_median_blur"] = {
  init: function () {
    this.appendValueInput("src")
        .setCheck(null)
        .appendField("Apply median blur to image");
    this.appendValueInput("ksize")
        .setCheck("Number")
        .appendField("Kernel size");
    this.appendValueInput("dst")
        .setCheck(null)
        .appendField("Store result in");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Apply median blur to the input image with the specified kernel size.");
    this.setColour("#6A5ACD"); // Purple color for consistency
    this.setHelpUrl(""); // URL to the documentation or help
  }
};

Blockly.Python["cv2_median_blur"] = function (block) {
  var value_src = Blockly.Python.valueToCode(block, "src", Blockly.Python.ORDER_ATOMIC);
  var value_ksize = Blockly.Python.valueToCode(block, "ksize", Blockly.Python.ORDER_ATOMIC);
  var value_dst = Blockly.Python.valueToCode(block, "dst", Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["cv2"] = "import cv2 as cv";

  var code = value_dst + " = cv2.medianBlur(" + value_src + ", " + value_ksize + ")\n";
  return code;
};

Blockly.Blocks["cv2_bilateral_filter"] = {
  init: function () {
    this.appendValueInput("src")
        .setCheck(null)
        .appendField("Apply bilateral filter to image");
    this.appendValueInput("d")
        .setCheck("Number")
        .appendField("Diameter of each pixel neighborhood");
    this.appendValueInput("sigma_color")
        .setCheck("Number")
        .appendField("Sigma color");
    this.appendValueInput("sigma_space")
        .setCheck("Number")
        .appendField("Sigma space");
    this.appendValueInput("dst")
        .setCheck(null)
        .appendField("Store result in");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Apply bilateral filter to the input image with the specified parameters.");
    this.setColour("#6A5ACD"); // Purple color for consistency
    this.setHelpUrl(""); // URL to the documentation or help
  }
};

Blockly.Python["cv2_bilateral_filter"] = function (block) {
  var value_src = Blockly.Python.valueToCode(block, "src", Blockly.Python.ORDER_ATOMIC);
  var value_d = Blockly.Python.valueToCode(block, "d", Blockly.Python.ORDER_ATOMIC);
  var value_sigma_color = Blockly.Python.valueToCode(block, "sigma_color", Blockly.Python.ORDER_ATOMIC);
  var value_sigma_space = Blockly.Python.valueToCode(block, "sigma_space", Blockly.Python.ORDER_ATOMIC);
  var value_dst = Blockly.Python.valueToCode(block, "dst", Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["cv2"] = "import cv2 as cv";

  var code = value_dst + " = cv2.bilateralFilter(" + value_src + ", " + value_d + ", " + 
             value_sigma_color + ", " + value_sigma_space + ")\n";
  return code;
};

Blockly.Blocks["cv2_ellipse"] = {
  init: function () {
    this.appendValueInput("image")
        .setCheck(null)
        .appendField("Draw ellipse on image");
    this.appendValueInput("center")
        .setCheck(null)
        .appendField("Center (x, y)");
    this.appendValueInput("axes_length")
        .setCheck(null)
        .appendField("Axes length (major, minor)");
    this.appendValueInput("angle")
        .setCheck("Number")
        .appendField("Angle of rotation (degrees)");
    this.appendValueInput("start_angle")
        .setCheck("Number")
        .appendField("Start angle (degrees)");
    this.appendValueInput("end_angle")
        .setCheck("Number")
        .appendField("End angle (degrees)");
    this.appendValueInput("color")
        .setCheck(null)
        .appendField("Color (B, G, R)");
    this.appendValueInput("thickness")
        .setCheck("Number")
        .appendField("Thickness");
    this.appendValueInput("line_type")
        .setCheck("Number")
        .appendField("Line type");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Draws a simple or thick elliptic arc or fills an ellipse sector.");
    this.setColour("#6A5ACD"); // Purple color for consistency
    this.setHelpUrl(""); // URL to the documentation or help
  }
};

Blockly.Python["cv2_ellipse"] = function (block) {
  var value_image = Blockly.Python.valueToCode(block, "image", Blockly.Python.ORDER_ATOMIC);
  var value_center = Blockly.Python.valueToCode(block, "center", Blockly.Python.ORDER_ATOMIC);
  var value_axes_length = Blockly.Python.valueToCode(block, "axes_length", Blockly.Python.ORDER_ATOMIC);
  var value_angle = Blockly.Python.valueToCode(block, "angle", Blockly.Python.ORDER_ATOMIC);
  var value_start_angle = Blockly.Python.valueToCode(block, "start_angle", Blockly.Python.ORDER_ATOMIC);
  var value_end_angle = Blockly.Python.valueToCode(block, "end_angle", Blockly.Python.ORDER_ATOMIC);
  var value_color = Blockly.Python.valueToCode(block, "color", Blockly.Python.ORDER_ATOMIC);
  var value_thickness = Blockly.Python.valueToCode(block, "thickness", Blockly.Python.ORDER_ATOMIC);
  var value_line_type = Blockly.Python.valueToCode(block, "line_type", Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["cv2"] = "import cv2 as cv";

  var code = "cv2.ellipse(" + value_image + ", " + value_center + ", " + value_axes_length + ", " +
             value_angle + ", " + value_start_angle + ", " + value_end_angle + ", " + value_color + ", " +
             value_thickness + ", " + value_line_type + ")\n";
  return code;
};

Blockly.Blocks["cv2_rotate"] = {
  init: function () {
    this.appendValueInput("image")
        .setCheck(null)
        .appendField("Rotate image");
    this.appendDummyInput()
        .appendField("Rotation")
        .appendField(new Blockly.FieldDropdown([
            ["90 degrees clockwise", "cv2.ROTATE_90_CLOCKWISE"],
            ["180 degrees", "cv2.ROTATE_180"],
            ["90 degrees counterclockwise", "cv2.ROTATE_90_COUNTERCLOCKWISE"]
        ]), "rotation_type");
    this.appendValueInput("dst")
        .setCheck(null)
        .appendField("Store result in");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Rotates an image using a predefined rotation type.");
    this.setColour("#6A5ACD"); // Purple color for consistency
    this.setHelpUrl(""); // URL to the documentation or help
  }
};

Blockly.Python["cv2_rotate"] = function (block) {
  var value_image = Blockly.Python.valueToCode(block, "image", Blockly.Python.ORDER_ATOMIC);
  var dropdown_rotation_type = block.getFieldValue("rotation_type");
  var value_dst = Blockly.Python.valueToCode(block, "dst", Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["import_cv2"] = "import cv2 as cv";

  var code = value_dst + " = cv.rotate(" + value_image + ", " + dropdown_rotation_type + ")\n";
  return code;
};


Blockly.Blocks["cv2_circle"] = {
  init: function () {
    this.appendValueInput("src")
        .setCheck(null)
        .appendField("Draw a circle on image");
    this.appendValueInput("center")
        .setCheck("Array")
        .appendField("Center coordinates")
        .appendField("x:");
    this.appendValueInput("radius")
        .setCheck("Number")
        .appendField("Radius");
    this.appendValueInput("color")
        .setCheck(null)
        .appendField("Color (BGR)");
    this.appendValueInput("thickness")
        .setCheck("Number")
        .appendField("Thickness");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("Draws a circle on the specified image.");
    this.setColour("#6A5ACD"); // Purple color for consistency
    this.setHelpUrl(""); // URL to the documentation or help
  }
};

Blockly.Python["cv2_circle"] = function (block) {
  var value_src = Blockly.Python.valueToCode(block, "src", Blockly.Python.ORDER_ATOMIC);
  var value_center = Blockly.Python.valueToCode(block, "center", Blockly.Python.ORDER_ATOMIC);
  var value_radius = Blockly.Python.valueToCode(block, "radius", Blockly.Python.ORDER_ATOMIC);
  var value_color = Blockly.Python.valueToCode(block, "color", Blockly.Python.ORDER_ATOMIC);
  var value_thickness = Blockly.Python.valueToCode(block, "thickness", Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_["cv2"] = "import cv2 as cv";

  var code = "cv2.circle(" + value_src + ", " + value_center + ", " +
             value_radius + ", " + value_color + ", " + value_thickness + ")\n";
  return code;
};

Blockly.Blocks["cv2_resize"] = {
  init: function () {
    this.appendValueInput("image")
        .setCheck(null)
        .appendField("Resize Image");
    this.appendValueInput("size")
        .setCheck(null)
        .appendField("to size");
    this.setOutput(true, null);
    this.setColour("#6A5ACD"); // CV block color
    this.setTooltip("Resize an image using cv2.resize()");
    this.setHelpUrl(""); // URL to the documentation or help
  }
};

Blockly.Python["cv2_resize"] = function (block) {
  Blockly.Python.definitions_["import_cv2"] = "import cv2";
  var value_image = Blockly.Python.valueToCode(block, "image", Blockly.Python.ORDER_ATOMIC);
  var value_size = Blockly.Python.valueToCode(block, "size", Blockly.Python.ORDER_ATOMIC);
  return ["cv2.resize(" + value_image + ", " + value_size + ")", Blockly.Python.ORDER_FUNCTION_CALL];
};


Blockly.Blocks["cv2_waitkey"] = {
  init: function () {
    this.appendValueInput("delayjey")
      .setCheck("Number")
      .appendField("Wait key: delay");
    this.setOutput(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_waitkey"] = function (block) {
  var value_delayjey = Blockly.Python.valueToCode(
    block,
    "delayjey",
    Blockly.Python.ORDER_ATOMIC
  );

  Blockly.Python.definitions_["cv2"] =
    "import cv2 as cv";
  // TODO: Assemble Python into code variable.
  var code = "cv.waitKey(" + value_delayjey + ")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_destroyall"] = {
  init: function () {
    this.appendDummyInput().appendField("Destroy all windows");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_destroyall"] = function (block) {
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_["cv2"] =
    "import cv2 as cv";
  var code = "cv.destroyAllWindows()\n";
  return code;
};

Blockly.Blocks["cv2_imagewrite"] = {
  init: function () {
    this.appendDummyInput().appendField("Save image:");
    this.appendDummyInput()
      .appendField("Image object")
      .appendField(new Blockly.FieldVariable("image_file"), "var_image");
    this.appendValueInput("file_name")
      .setCheck("String")
      .appendField("File name");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_imagewrite"] = function (block) {
  var variable_var_image = Blockly.Python.variableDB_.getName(
    block.getFieldValue("var_image"),
    Blockly.Variables.NAME_TYPE
  );
  var value_file_name = Blockly.Python.valueToCode(
    block,
    "file_name",
    Blockly.Python.ORDER_ATOMIC
  );
  Blockly.Python.definitions_["cv2"] =
    "import cv2 as cv";

  // TODO: Assemble Python into code variable.
  //cv.imwrite('messigray.png',img)
  var code = "cv.imwrite(" + value_file_name + "," + variable_var_image + ")\n";
  return code;
};

Blockly.Blocks["cv2_capturevideo"] = {
  init: function () {
    this.appendDummyInput().appendField("Capture video from camera");
    this.appendDummyInput()
      .appendField("VideoCapture object")
      .appendField(new Blockly.FieldVariable("cap"), "VidCapObj");
    this.appendValueInput("camera").setCheck("Number").appendField("Camera");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_capturevideo"] = function (block) {
  var variable_vidcapobj = Blockly.Python.variableDB_.getName(
    block.getFieldValue("VidCapObj"),
    Blockly.Variables.NAME_TYPE
  );
  var value_camera = Blockly.Python.valueToCode(
    block,
    "camera",
    Blockly.Python.ORDER_ATOMIC
  );

  Blockly.Python.definitions_["cv2"] =
    "import cv2 as cv";
  Blockly.Python.definitions_["numpy"] = "import numpy as np";
  //cap = cv.VideoCapture(0)
  // TODO: Assemble Python into code variable.
  var code = variable_vidcapobj + " = cv.VideoCapture(" + value_camera + ")\n";
  return code;
};

Blockly.Blocks["cv2_videoread"] = {
  init: function () {
    this.appendDummyInput().appendField("Capture video");
    this.appendDummyInput()
      .appendField("Return (Boolean)")
      .appendField(new Blockly.FieldVariable("ret"), "ret_boolean");
    this.appendDummyInput()
      .appendField("Frame (Frame object)")
      .appendField(new Blockly.FieldVariable("frame"), "frame_object");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_videoread"] = function (block) {
  var variable_ret_boolean = Blockly.Python.variableDB_.getName(
    block.getFieldValue("ret_boolean"),
    Blockly.Variables.NAME_TYPE
  );
  var variable_frame_object = Blockly.Python.variableDB_.getName(
    block.getFieldValue("frame_object"),
    Blockly.Variables.NAME_TYPE
  );
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_["cv2"] =
    "import cv2 as cv";
  Blockly.Python.definitions_["numpy"] = "import numpy as np";
  //ret, frame = cap.read()
  var code =
    variable_ret_boolean + " , " + variable_frame_object + " = cap.read()\n";
  return code;
};

Blockly.Blocks["cv2_cap_release"] = {
  init: function () {
    this.appendDummyInput().appendField("Capture video release");
    this.appendDummyInput()
      .appendField("VideoCapture object")
      .appendField(new Blockly.FieldVariable("cap"), "VidCapObj");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_cap_release"] = function (block) {
  var variable_vidcapobj = Blockly.Python.variableDB_.getName(
    block.getFieldValue("VidCapObj"),
    Blockly.Variables.NAME_TYPE
  );

  Blockly.Python.definitions_["cv2"] =
    "import cv2 as cv";
  Blockly.Python.definitions_["numpy"] = "import numpy as np";
  // TODO: Assemble Python into code variable.
  var code = variable_vidcapobj + ".release()\n";
  return code;
};

Blockly.Blocks["cv2_capturevideo_file"] = {
  init: function () {
    this.appendDummyInput().appendField("Capture video from File");
    this.appendDummyInput()
      .appendField("VideoCapture object")
      .appendField(new Blockly.FieldVariable("cap"), "VidCapObj");
    this.appendValueInput("file").setCheck("String").appendField("File");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_capturevideo_file"] = function (block) {
  var variable_vidcapobj = Blockly.Python.variableDB_.getName(
    block.getFieldValue("VidCapObj"),
    Blockly.Variables.NAME_TYPE
  );
  var value_file = Blockly.Python.valueToCode(
    block,
    "file",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  //cap = cv.VideoCapture('vtest.avi')
  var code = variable_vidcapobj + " = cv.VideoCapture(" + value_file + ")\n";
  return code;
};

Blockly.Blocks["cv2_waitkey2"] = {
  init: function () {
    this.appendValueInput("delay")
      .setCheck("Number")
      .appendField("Wait key (ms)");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_waitkey2"] = function (block) {
  var value_delay = Blockly.Python.valueToCode(
    block,
    "delay",
    Blockly.Python.ORDER_ATOMIC
  );

  Blockly.Python.definitions_["cv2"] =
    "import cv2 as cv";
  Blockly.Python.definitions_["numpy"] = "import numpy as np";

  // TODO: Assemble Python into code variable.
  var code = "cv.waitKey(" + value_delay + ")\n";
  return code;
};

Blockly.Blocks["cv2_createimage"] = {
  init: function () {
    this.appendDummyInput().appendField("Create image");
    this.appendValueInput("height").setCheck("Number").appendField("Height");
    this.appendValueInput("Width").setCheck("Number").appendField("Width");
    this.appendValueInput("Darkness")
      .setCheck("Number")
      .appendField("Darkness");
    this.setOutput(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_createimage"] = function (block) {
  var value_height = Blockly.Python.valueToCode(
    block,
    "height",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_width = Blockly.Python.valueToCode(
    block,
    "Width",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_darkness = Blockly.Python.valueToCode(
    block,
    "Darkness",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  //np.ones((300,300,1),np.uint8)*150
  var code =
    "np.ones((" +
    value_height +
    "," +
    value_width +
    ",3),np.uint8)*" +
    value_darkness +
    "\n";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_drawline"] = {
  init: function () {
    this.appendValueInput("image")
      .setCheck(null)
      .appendField("Draw line")
      .appendField("Image object");
    this.appendValueInput("pt1_x")
      .setCheck("Number")
      .appendField("Start point X");
    this.appendValueInput("pt1_y")
      .setCheck("Number")
      .appendField("Start point Y");
    this.appendValueInput("pt2_x")
      .setCheck("Number")
      .appendField("End point X");
    this.appendValueInput("pt2_y")
      .setCheck("Number")
      .appendField("End point Y");
    this.appendValueInput("colour").setCheck(null).appendField("Colour");
    this.appendValueInput("thickness")
      .setCheck("Number")
      .appendField("Thickness (px) ");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_drawline"] = function (block) {
  var value_image = Blockly.Python.valueToCode(
    block,
    "image",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_pt1_x = Blockly.Python.valueToCode(
    block,
    "pt1_x",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_pt1_y = Blockly.Python.valueToCode(
    block,
    "pt1_y",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_pt2_x = Blockly.Python.valueToCode(
    block,
    "pt2_x",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_pt2_y = Blockly.Python.valueToCode(
    block,
    "pt2_y",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_colour = Blockly.Python.valueToCode(
    block,
    "colour",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_thickness = Blockly.Python.valueToCode(
    block,
    "thickness",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_["cv2"] =
    "import cv2 as cv";
  Blockly.Python.definitions_["numpy"] = "import numpy as np";

  //cv.line(img,(0,0),(511,511),(0x00,0x00,0xff),5)

  var code =
    "cv.line(" +
    value_image +
    ",(" +
    value_pt1_x +
    "," +
    value_pt1_y +
    "),(" +
    value_pt2_x +
    "," +
    value_pt2_y +
    ")," +
    value_colour +
    "," +
    value_thickness +
    ")\n";
  return code;
};

Blockly.Blocks["cv2_puttext"] = {
  init: function () {
    this.appendDummyInput().appendField("Insert text");
    this.appendValueInput("image").setCheck(null).appendField("Image object");
    this.appendValueInput("text").setCheck("String").appendField("Text");
    this.appendValueInput("pos_x").setCheck(null).appendField("Coordinate X");
    this.appendValueInput("pos_y").setCheck(null).appendField("Coordinate Y");
    this.appendDummyInput()
      .appendField("Font")
      .appendField(
        new Blockly.FieldDropdown([
          ["normal size sans-serif", "cv.FONT_HERSHEY_SIMPLEX"],
          ["small size sans-serif", "cv.FONT_HERSHEY_PLAIN"],
          ["normal size sans-serif", "cv.FONT_HERSHEY_DUPLEX"],
          ["normal size serif", "cv.FONT_HERSHEY_TRIPLEX"],
          [
            "smaller version of HERSHEY COMPLEX ",
            "cv.FONT_HERSHEY_COMPLEX_SMALL \t",
          ],
          ["hand-writing style", "cv.FONT_HERSHEY_SCRIPT_SIMPLEX"],
        ]),
        "font"
      );
    this.appendValueInput("fontScale")
      .setCheck("Number")
      .appendField("fontScale");
    this.appendValueInput("Colour").setCheck(null).appendField("Colour");
    this.appendValueInput("thickness")
      .setCheck("Number")
      .appendField("Thickness");
    this.appendDummyInput()
      .appendField("Line type: ")
      .appendField(
        new Blockly.FieldDropdown([
          ["Filled", "cv.FILLED"],
          ["4 connected line", "cv.LINE_4"],
          ["8 connected line", "cv.LINE_8"],
          ["antialiased line ", "cv.LINE_AA \t"],
        ]),
        "line_type"
      );
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_puttext"] = function (block) {
  var value_image = Blockly.Python.valueToCode(
    block,
    "image",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_text = Blockly.Python.valueToCode(
    block,
    "text",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_pos_x = Blockly.Python.valueToCode(
    block,
    "pos_x",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_pos_y = Blockly.Python.valueToCode(
    block,
    "pos_y",
    Blockly.Python.ORDER_ATOMIC
  );
  var dropdown_font = block.getFieldValue("font");
  var value_fontscale = Blockly.Python.valueToCode(
    block,
    "fontScale",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_colour = Blockly.Python.valueToCode(
    block,
    "Colour",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_thickness = Blockly.Python.valueToCode(
    block,
    "thickness",
    Blockly.Python.ORDER_ATOMIC
  );
  var dropdown_line_type = block.getFieldValue("line_type");
  // TODO: Assemble Python into code variable.
  //cv.putText(img,'OpenCV',(10,500), font, 4,(255,255,255),2,cv.LINE_AA)
  var code =
    "cv.putText(" +
    value_image +
    "," +
    value_text +
    ",(" +
    value_pos_x +
    "," +
    value_pos_y +
    "), " +
    dropdown_font +
    ", " +
    value_fontscale +
    "," +
    value_colour +
    "," +
    value_thickness +
    "," +
    dropdown_line_type +
    ")\n";
  return code;
};

Blockly.Blocks["cv2_roi"] = {
  init: function () {
    this.appendDummyInput().appendField("Select region of Interest");
    this.appendValueInput("Image").setCheck(null).appendField("Image");
    this.appendValueInput("val1").setCheck("Number").appendField("Y");
    this.appendValueInput("val2").setCheck("Number").appendField("Y + Height");
    this.appendValueInput("val3").setCheck("Number").appendField("X");
    this.appendValueInput("val4").setCheck("Number").appendField("X + Width");
    this.setOutput(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_roi"] = function (block) {
  var value_image = Blockly.Python.valueToCode(
    block,
    "Image",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_val1 = Blockly.Python.valueToCode(
    block,
    "val1",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_val2 = Blockly.Python.valueToCode(
    block,
    "val2",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_val3 = Blockly.Python.valueToCode(
    block,
    "val3",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_val4 = Blockly.Python.valueToCode(
    block,
    "val4",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  //img[y:y+h, x:x+w]
  var code =
    value_image +
    "[" +
    value_val1 +
    ":" +
    value_val2 +
    "," +
    value_val3 +
    ":" +
    value_val4 +
    "]";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_roi_affect"] = {
  init: function () {
    this.appendDummyInput().appendField("Region of Interest");
    this.appendValueInput("Image").setCheck(null).appendField("Set to Image");
    this.appendValueInput("val1").setCheck("Number").appendField("Y");
    this.appendValueInput("val2").setCheck("Number").appendField("Y + Height");
    this.appendValueInput("val3").setCheck("Number").appendField("X");
    this.appendValueInput("val4").setCheck("Number").appendField("X + Width");
    this.appendValueInput("img_source")
      .setCheck(null)
      .appendField("Source image");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_roi_affect"] = function (block) {
  var value_image = Blockly.Python.valueToCode(
    block,
    "Image",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_val1 = Blockly.Python.valueToCode(
    block,
    "val1",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_val2 = Blockly.Python.valueToCode(
    block,
    "val2",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_val3 = Blockly.Python.valueToCode(
    block,
    "val3",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_val4 = Blockly.Python.valueToCode(
    block,
    "val4",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_img_source = Blockly.Python.valueToCode(
    block,
    "img_source",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  //img[y:y+h, x:x+w]
  var code =
    value_image +
    "[" +
    value_val1 +
    ":" +
    value_val2 +
    "," +
    value_val3 +
    ":" +
    value_val4 +
    "] = " +
    value_img_source;
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Blocks["cv2_convertimage"] = {
  init: function () {
    this.appendDummyInput().appendField("Convert image");
    this.appendValueInput("src").setCheck(null).appendField("Source:");
    this.appendDummyInput()
      .appendField("Conversion: ")
      .appendField(
        new Blockly.FieldDropdown([
          ["Between RGB/BGR and grayscale", "cv.COLOR_BGR2GRAY"],
          ["Add alpha channel to RGB or BGR image", "cv.COLOR_BGR2BGRA"],
          ["remove alpha channel from RGB or BGR image", "cv.COLOR_BGRA2BGR"],
          ["Between RGB/BGR and BGR565 ", "cv.COLOR_BGR2BGR565"],
          ["Between RGB and BGR color spaces ", "cv.COLOR_BGR2RGBA"],
          ["Between grayscale to BGR565 ", "cv.COLOR_GRAY2BGR565"],
        ]),
        "conv_code"
      );
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_convertimage"] = function (block) {
  var value_src = Blockly.Python.valueToCode(
    block,
    "src",
    Blockly.Python.ORDER_ATOMIC
  );
  var dropdown_conv_code = block.getFieldValue("conv_code");
  // TODO: Assemble Python into code variable.
  //cv.cvtColor(frame, cv.COLOR_BGR2GRAY)

  var code = "cv.cvtColor(" + value_src + ", " + dropdown_conv_code + ")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_isopen"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Is VideoCapture object ")
      .appendField(new Blockly.FieldVariable("cap"), "video_object")
      .appendField("open?");
    this.setOutput(true, "Boolean");
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_isopen"] = function (block) {
  var variable_video_object = Blockly.Python.variableDB_.getName(
    block.getFieldValue("video_object"),
    Blockly.Variables.NAME_TYPE
  );
  // TODO: Assemble Python into code variable.
  var code = variable_video_object + ".isOpened()";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_imageprop"] = {
  init: function () {
    this.appendDummyInput().appendField("Image property: ");
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ["Shape ", "shape "],
        ["Size ", "size "],
        ["Data type", "dtype "],
      ]),
      "prop"
    );
    this.appendValueInput("image").setCheck(null).appendField("Image object");
    this.setOutput(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_imageprop"] = function (block) {
  var dropdown_prop = block.getFieldValue("prop");
  var value_image = Blockly.Python.valueToCode(
    block,
    "image",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  var code = value_image + "." + dropdown_prop;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_imageadditionw"] = {
  init: function () {
    this.appendDummyInput().appendField("Image addition (weighted)");
    this.appendValueInput("img1").setCheck(null).appendField("Image 1");
    this.appendValueInput("w1").setCheck("Number").appendField("Weight 1");
    this.appendValueInput("img2").setCheck(null).appendField("Image 2");
    this.appendValueInput("w2").setCheck("Number").appendField("Weight 2");
    this.appendValueInput("gamma").setCheck("Number").appendField("Gamma");
    this.setOutput(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_imageadditionw"] = function (block) {
  var value_img1 = Blockly.Python.valueToCode(
    block,
    "img1",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_w1 = Blockly.Python.valueToCode(
    block,
    "w1",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_img2 = Blockly.Python.valueToCode(
    block,
    "img2",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_w2 = Blockly.Python.valueToCode(
    block,
    "w2",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_gamma = Blockly.Python.valueToCode(
    block,
    "gamma",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  //cv.addWeighted(img1,0.7,img2,0.3,0)
  var code =
    "cv.addWeighted(" +
    value_img1 +
    "," +
    value_w1 +
    "," +
    value_img2 +
    "," +
    value_w2 +
    "," +
    value_gamma +
    ")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_gettick"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("get Tick")
      .appendField(
        new Blockly.FieldDropdown([
          ["Count", "cv.getTickCount"],
          ["Frequency", "cv.getTickFrequency"],
        ]),
        "type"
      );
    this.setOutput(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_gettick"] = function (block) {
  var dropdown_type = block.getFieldValue("type");
  // TODO: Assemble Python into code variable.
  var code = dropdown_type + "()";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_cascadeclassifier"] = {
  init: function () {
    this.appendValueInput("CascadeClassifier")
      .setCheck("String")
      .appendField("Cascade Classifier");
    this.setOutput(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_cascadeclassifier"] = function (block) {
  var value_cascadeclassifier = Blockly.Python.valueToCode(
    block,
    "CascadeClassifier",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_["cv2"] =
    "import cv2 as cv";
  Blockly.Python.definitions_["numpy"] = "import numpy as np\n";

  var code = "cv.CascadeClassifier(" + value_cascadeclassifier + ")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_detectmultiscale_1p"] = {
  init: function () {
    this.appendDummyInput().appendField("detect MultiScale");
    this.appendDummyInput()
      .appendField("Cascade Classifier:")
      .appendField(new Blockly.FieldVariable("item"), "NAME");
    this.appendValueInput("p_image").setCheck(null).appendField("Image:");
    this.setOutput(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_detectmultiscale_1p"] = function (block) {
  var variable_name = Blockly.Python.variableDB_.getName(
    block.getFieldValue("NAME"),
    Blockly.Variables.NAME_TYPE
  );
  var value_p_image = Blockly.Python.valueToCode(
    block,
    "p_image",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  //eye_cascade.detectMultiScale(roi_gray)
  var code = variable_name + ".detectMultiScale(" + value_p_image + ")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_detectmultiscale_3p"] = {
  init: function () {
    this.appendDummyInput().appendField("detect MultiScale");
    this.appendDummyInput()
      .appendField("Cascade Classifier:")
      .appendField(new Blockly.FieldVariable("item"), "NAME");
    this.appendValueInput("p_image").setCheck(null).appendField("Image:");
    this.appendValueInput("scaleFactor ")
      .setCheck("Number")
      .appendField("scaleFactor ");
    this.appendValueInput("minNeighbors ")
      .setCheck("Number")
      .appendField("minNeighbors ");
    this.setOutput(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_detectmultiscale_3p"] = function (block) {
  var variable_name = Blockly.Python.variableDB_.getName(
    block.getFieldValue("NAME"),
    Blockly.Variables.NAME_TYPE
  );
  var value_p_image = Blockly.Python.valueToCode(
    block,
    "p_image",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_scalefactor_ = Blockly.Python.valueToCode(
    block,
    "scaleFactor ",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_minneighbors_ = Blockly.Python.valueToCode(
    block,
    "minNeighbors ",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  var code =
    variable_name +
    ".detectMultiScale(" +
    value_p_image +
    "," +
    value_scalefactor_ +
    "," +
    value_minneighbors_ +
    ")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_calculatediffpercentage"] = {
  init: function () {
    this.appendDummyInput().appendField("Calculate Image difference ");
    this.appendValueInput("Image1").setCheck(null).appendField("Image 1");
    this.appendValueInput("Image2").setCheck(null).appendField("Image 2");
    this.setOutput(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_calculatediffpercentage"] = function (block) {
  var value_image1 = Blockly.Python.valueToCode(
    block,
    "Image1",
    Blockly.Python.ORDER_ATOMIC
  );
  var value_image2 = Blockly.Python.valueToCode(
    block,
    "Image2",
    Blockly.Python.ORDER_ATOMIC
  );

  // TODO: Assemble Python into code variable.
  var mufon = "def CalculatePercentage(f1,f2):\n";
  mufon += "  res = cv.absdiff(f1,f2)\n";
  mufon += "  res = res.astype(np.uint8)\n";
  mufon += "  resultat = (np.count_nonzero(res) * 100)/ res.size\n";
  mufon += "  return resultat\n";

  Blockly.Python.definitions_["%calculatediffpercentage"] = mufon;
  var code;
  code = "CalculatePercentage(" + value_image1 + "," + value_image2 + ")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["qr_reader_decode"] = {
  init: function () {
    this.appendValueInput("FrameToDecode")
      .setCheck(null)
      .appendField("QR-Reader: decode frame");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["qr_reader_decode"] = function (block) {
  var value_frametodecode = Blockly.Python.valueToCode(
    block,
    "FrameToDecode",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.

  Blockly.Python.definitions_["pyzbar"] =
    "import pyzbar.pyzbar as pyzbar";
  Blockly.Python.definitions_["numpy"] = "import numpy as np\n";

  var code = "pyzbar.decode(" + value_frametodecode + ")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["qr_reader_data"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("QR-Reader: decoded Object DATA")
      .appendField(new Blockly.FieldVariable("item"), "NAME");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["qr_reader_data"] = function (block) {
  var variable_name = Blockly.Python.variableDB_.getName(
    block.getFieldValue("NAME"),
    Blockly.Variables.NAME_TYPE
  );
  // TODO: Assemble Python into code variable.
  var code = variable_name + ".data.decode()";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_getproplist"] = {
  init: function () {
    this.appendDummyInput().appendField("Get Camera Properties: ");

    this.appendDummyInput()
      .appendField("VideoCapture object")
      .appendField(new Blockly.FieldVariable("cap"), "VidCapObj");
    this.appendDummyInput()
      .appendField("")
      .appendField(
        new Blockly.FieldDropdown([
          ["Frame Width", "CAP_PROP_FRAME_WIDTH"],
          ["Frame Height", "CAP_PROP_FRAME_HEIGHT"],
          ["Frame per second", "CAP_PROP_FPS"],
          ["Frame Brightness", "CAP_PROP_BRIGHTNESS"],
          ["Frame Contrast", "CAP_PROP_CONTRAST"],
        ]),
        "PropChoice"
      );
    this.setOutput(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_getproplist"] = function (block) {
  var dropdown_propchoice = block.getFieldValue("PropChoice");
  var variable_vidcapobj = Blockly.Python.variableDB_.getName(
    block.getFieldValue("VidCapObj"),
    Blockly.Variables.NAME_TYPE
  );
  // TODO: Assemble Python into code variable. cap.get(cv2.CAP_PROP_FRAME_HEIGHT)cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

  var code = variable_vidcapobj + ".get(cv." + dropdown_propchoice + ")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_getpropnum"] = {
  init: function () {
    this.appendDummyInput().appendField("Get Camera Properties: ");

    this.appendDummyInput()
      .appendField("VideoCapture object")
      .appendField(new Blockly.FieldVariable("cap"), "VidCapObj");
    this.appendValueInput("PropNumber")
      .setCheck("Number")
      .appendField("Number");
    this.setOutput(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_getpropnum"] = function (block) {
  var value_propnumber = Blockly.Python.valueToCode(
    block,
    "PropNumber",
    Blockly.Python.ORDER_ATOMIC
  );
  var variable_vidcapobj = Blockly.Python.variableDB_.getName(
    block.getFieldValue("VidCapObj"),
    Blockly.Variables.NAME_TYPE
  );
  //cap.get(3)
  // TODO: Assemble Python into code variable.
  var code = variable_vidcapobj + ".get(" + value_propnumber + ")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["cv2_Setproplist"] = {
  init: function () {
    this.appendDummyInput().appendField("Set Camera Properties: ");

    this.appendDummyInput()
      .appendField("VideoCapture object")
      .appendField(new Blockly.FieldVariable("cap"), "VidCapObj");
    this.appendDummyInput()
      .appendField("")
      .appendField(
        new Blockly.FieldDropdown([
          ["Frame Width", "3"],
          ["Frame Height", "4"],
          ["Frame per second", "5"],
          ["Frame Brightness", "10 "],
          ["Frame Contrast", "11"],
        ]),
        "PropChoice"
      );
    this.appendValueInput("PropNumber").setCheck("Number").appendField("Value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_Setproplist"] = function (block) {
  var dropdown_propchoice = block.getFieldValue("PropChoice");
  var variable_vidcapobj = Blockly.Python.variableDB_.getName(
    block.getFieldValue("VidCapObj"),
    Blockly.Variables.NAME_TYPE
  );
  var value_propnumber = Blockly.Python.valueToCode(
    block,
    "PropNumber",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable. cap.get(cv2.CAP_PROP_FRAME_HEIGHT)cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

  var code =
    variable_vidcapobj +
    ".set(" +
    dropdown_propchoice +
    "," +
    value_propnumber +
    ")";
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Blocks["cv2_SetpropVal"] = {
  init: function () {
    this.appendDummyInput().appendField("Set Camera Properties: ");
    this.appendDummyInput()
      .appendField("VideoCapture object")
      .appendField(new Blockly.FieldVariable("cap"), "VidCapObj");
    this.appendValueInput("Prop")
      .setCheck("Number")
      .appendField("Property number");
    this.appendValueInput("PropNumber").setCheck("Number").appendField("Value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["cv2_SetpropVal"] = function (block) {
  //var dropdown_propchoice = block.getFieldValue('PropChoice');
  var value_prop = Blockly.Python.valueToCode(
    block,
    "Prop",
    Blockly.Python.ORDER_ATOMIC
  );
  var variable_vidcapobj = Blockly.Python.variableDB_.getName(
    block.getFieldValue("VidCapObj"),
    Blockly.Variables.NAME_TYPE
  );
  var value_propnumber = Blockly.Python.valueToCode(
    block,
    "PropNumber",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable. cap.get(cv2.CAP_PROP_FRAME_HEIGHT)cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

  var code =
    variable_vidcapobj + ".set(" + value_prop + "," + value_propnumber + ")";
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Blocks["ocr_image_to_string"] = {
  init: function () {
    this.appendDummyInput().appendField("OCR Image to string");
    this.appendValueInput("OCR_IMAGE")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Image");
    this.setOutput(true, "String");
    this.setColour(230);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["ocr_image_to_string"] = function (block) {
  var value_ocr_image = Blockly.Python.valueToCode(
    block,
    "OCR_IMAGE",
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.

  Blockly.Python.definitions_["pytesseract"] = "import pytesseract";

  var code = "pytesseract.image_to_string(" + value_ocr_image + ")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["capture_image_stream"] = {
  init: function () {
    this.appendDummyInput().appendField("Capture Image from stream");
    this.appendDummyInput()
      .appendField("Stream URL")
      .appendField(new Blockly.FieldTextInput("http://IP/"), "St_URL");
    this.appendDummyInput()
      .appendField("Image object (Output)")
      .appendField(new Blockly.FieldVariable("item"), "img_obj");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setColour("#6A5ACD");
    this.setHelpUrl("");
  },
};

Blockly.Python["capture_image_stream"] = function (block) {
  var text_st_url = block.getFieldValue("St_URL");
  var variable_img_obj = Blockly.Python.variableDB_.getName(
    block.getFieldValue("img_obj"),
    Blockly.Variables.NAME_TYPE
  );
  // TODO: Assemble Python into code variable.

  Blockly.Python.definitions_["urllib.request"] = "import urllib.request";

  var code = "imgResponse = urllib.request.urlopen ('" + text_st_url + "')\n";
  code += "imgNp = np.array(bytearray(imgResponse.read()),dtype=np.uint8)\n";
  code += variable_img_obj + "= cv.imdecode (imgNp,-1)\n";
  return code;
};

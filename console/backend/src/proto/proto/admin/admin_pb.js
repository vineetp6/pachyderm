// source: admin/admin.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var version_versionpb_version_pb = require('../version/versionpb/version_pb.js');
goog.object.extend(proto, version_versionpb_version_pb);
var pfs_pfs_pb = require('../pfs/pfs_pb.js');
goog.object.extend(proto, pfs_pfs_pb);
goog.exportSymbol('proto.admin_v2.ClusterInfo', null, global);
goog.exportSymbol('proto.admin_v2.InspectClusterRequest', null, global);
goog.exportSymbol('proto.admin_v2.WebResource', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.admin_v2.ClusterInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.admin_v2.ClusterInfo.repeatedFields_, null);
};
goog.inherits(proto.admin_v2.ClusterInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.admin_v2.ClusterInfo.displayName = 'proto.admin_v2.ClusterInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.admin_v2.InspectClusterRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.admin_v2.InspectClusterRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.admin_v2.InspectClusterRequest.displayName = 'proto.admin_v2.InspectClusterRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.admin_v2.WebResource = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.admin_v2.WebResource, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.admin_v2.WebResource.displayName = 'proto.admin_v2.WebResource';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.admin_v2.ClusterInfo.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.admin_v2.ClusterInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.admin_v2.ClusterInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.admin_v2.ClusterInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.admin_v2.ClusterInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    deploymentId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    warningsOk: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    warningsList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f,
    proxyHost: jspb.Message.getFieldWithDefault(msg, 5, ""),
    proxyTls: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
    paused: jspb.Message.getBooleanFieldWithDefault(msg, 7, false),
    webResources: (f = msg.getWebResources()) && proto.admin_v2.WebResource.toObject(includeInstance, f),
    metadataMap: (f = msg.getMetadataMap()) ? f.toObject(includeInstance, undefined) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.admin_v2.ClusterInfo}
 */
proto.admin_v2.ClusterInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.admin_v2.ClusterInfo;
  return proto.admin_v2.ClusterInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.admin_v2.ClusterInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.admin_v2.ClusterInfo}
 */
proto.admin_v2.ClusterInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeploymentId(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setWarningsOk(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.addWarnings(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setProxyHost(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setProxyTls(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPaused(value);
      break;
    case 8:
      var value = new proto.admin_v2.WebResource;
      reader.readMessage(value,proto.admin_v2.WebResource.deserializeBinaryFromReader);
      msg.setWebResources(value);
      break;
    case 9:
      var value = msg.getMetadataMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.admin_v2.ClusterInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.admin_v2.ClusterInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.admin_v2.ClusterInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.admin_v2.ClusterInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDeploymentId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getWarningsOk();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getWarningsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
  f = message.getProxyHost();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getProxyTls();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getPaused();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getWebResources();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.admin_v2.WebResource.serializeBinaryToWriter
    );
  }
  f = message.getMetadataMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(9, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.admin_v2.ClusterInfo.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.admin_v2.ClusterInfo} returns this
 */
proto.admin_v2.ClusterInfo.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string deployment_id = 2;
 * @return {string}
 */
proto.admin_v2.ClusterInfo.prototype.getDeploymentId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.admin_v2.ClusterInfo} returns this
 */
proto.admin_v2.ClusterInfo.prototype.setDeploymentId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool warnings_ok = 3;
 * @return {boolean}
 */
proto.admin_v2.ClusterInfo.prototype.getWarningsOk = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.admin_v2.ClusterInfo} returns this
 */
proto.admin_v2.ClusterInfo.prototype.setWarningsOk = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * repeated string warnings = 4;
 * @return {!Array<string>}
 */
proto.admin_v2.ClusterInfo.prototype.getWarningsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.admin_v2.ClusterInfo} returns this
 */
proto.admin_v2.ClusterInfo.prototype.setWarningsList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.admin_v2.ClusterInfo} returns this
 */
proto.admin_v2.ClusterInfo.prototype.addWarnings = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.admin_v2.ClusterInfo} returns this
 */
proto.admin_v2.ClusterInfo.prototype.clearWarningsList = function() {
  return this.setWarningsList([]);
};


/**
 * optional string proxy_host = 5;
 * @return {string}
 */
proto.admin_v2.ClusterInfo.prototype.getProxyHost = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.admin_v2.ClusterInfo} returns this
 */
proto.admin_v2.ClusterInfo.prototype.setProxyHost = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional bool proxy_tls = 6;
 * @return {boolean}
 */
proto.admin_v2.ClusterInfo.prototype.getProxyTls = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.admin_v2.ClusterInfo} returns this
 */
proto.admin_v2.ClusterInfo.prototype.setProxyTls = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional bool paused = 7;
 * @return {boolean}
 */
proto.admin_v2.ClusterInfo.prototype.getPaused = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.admin_v2.ClusterInfo} returns this
 */
proto.admin_v2.ClusterInfo.prototype.setPaused = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * optional WebResource web_resources = 8;
 * @return {?proto.admin_v2.WebResource}
 */
proto.admin_v2.ClusterInfo.prototype.getWebResources = function() {
  return /** @type{?proto.admin_v2.WebResource} */ (
    jspb.Message.getWrapperField(this, proto.admin_v2.WebResource, 8));
};


/**
 * @param {?proto.admin_v2.WebResource|undefined} value
 * @return {!proto.admin_v2.ClusterInfo} returns this
*/
proto.admin_v2.ClusterInfo.prototype.setWebResources = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.admin_v2.ClusterInfo} returns this
 */
proto.admin_v2.ClusterInfo.prototype.clearWebResources = function() {
  return this.setWebResources(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.admin_v2.ClusterInfo.prototype.hasWebResources = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * map<string, string> metadata = 9;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.admin_v2.ClusterInfo.prototype.getMetadataMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 9, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.admin_v2.ClusterInfo} returns this
 */
proto.admin_v2.ClusterInfo.prototype.clearMetadataMap = function() {
  this.getMetadataMap().clear();
  return this;};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.admin_v2.InspectClusterRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.admin_v2.InspectClusterRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.admin_v2.InspectClusterRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.admin_v2.InspectClusterRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    clientVersion: (f = msg.getClientVersion()) && version_versionpb_version_pb.Version.toObject(includeInstance, f),
    currentProject: (f = msg.getCurrentProject()) && pfs_pfs_pb.Project.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.admin_v2.InspectClusterRequest}
 */
proto.admin_v2.InspectClusterRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.admin_v2.InspectClusterRequest;
  return proto.admin_v2.InspectClusterRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.admin_v2.InspectClusterRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.admin_v2.InspectClusterRequest}
 */
proto.admin_v2.InspectClusterRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new version_versionpb_version_pb.Version;
      reader.readMessage(value,version_versionpb_version_pb.Version.deserializeBinaryFromReader);
      msg.setClientVersion(value);
      break;
    case 2:
      var value = new pfs_pfs_pb.Project;
      reader.readMessage(value,pfs_pfs_pb.Project.deserializeBinaryFromReader);
      msg.setCurrentProject(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.admin_v2.InspectClusterRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.admin_v2.InspectClusterRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.admin_v2.InspectClusterRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.admin_v2.InspectClusterRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getClientVersion();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      version_versionpb_version_pb.Version.serializeBinaryToWriter
    );
  }
  f = message.getCurrentProject();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      pfs_pfs_pb.Project.serializeBinaryToWriter
    );
  }
};


/**
 * optional versionpb_v2.Version client_version = 1;
 * @return {?proto.versionpb_v2.Version}
 */
proto.admin_v2.InspectClusterRequest.prototype.getClientVersion = function() {
  return /** @type{?proto.versionpb_v2.Version} */ (
    jspb.Message.getWrapperField(this, version_versionpb_version_pb.Version, 1));
};


/**
 * @param {?proto.versionpb_v2.Version|undefined} value
 * @return {!proto.admin_v2.InspectClusterRequest} returns this
*/
proto.admin_v2.InspectClusterRequest.prototype.setClientVersion = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.admin_v2.InspectClusterRequest} returns this
 */
proto.admin_v2.InspectClusterRequest.prototype.clearClientVersion = function() {
  return this.setClientVersion(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.admin_v2.InspectClusterRequest.prototype.hasClientVersion = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional pfs_v2.Project current_project = 2;
 * @return {?proto.pfs_v2.Project}
 */
proto.admin_v2.InspectClusterRequest.prototype.getCurrentProject = function() {
  return /** @type{?proto.pfs_v2.Project} */ (
    jspb.Message.getWrapperField(this, pfs_pfs_pb.Project, 2));
};


/**
 * @param {?proto.pfs_v2.Project|undefined} value
 * @return {!proto.admin_v2.InspectClusterRequest} returns this
*/
proto.admin_v2.InspectClusterRequest.prototype.setCurrentProject = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.admin_v2.InspectClusterRequest} returns this
 */
proto.admin_v2.InspectClusterRequest.prototype.clearCurrentProject = function() {
  return this.setCurrentProject(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.admin_v2.InspectClusterRequest.prototype.hasCurrentProject = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.admin_v2.WebResource.prototype.toObject = function(opt_includeInstance) {
  return proto.admin_v2.WebResource.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.admin_v2.WebResource} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.admin_v2.WebResource.toObject = function(includeInstance, msg) {
  var f, obj = {
    archiveDownloadBaseUrl: jspb.Message.getFieldWithDefault(msg, 1, ""),
    createPipelineRequestJsonSchemaUrl: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.admin_v2.WebResource}
 */
proto.admin_v2.WebResource.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.admin_v2.WebResource;
  return proto.admin_v2.WebResource.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.admin_v2.WebResource} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.admin_v2.WebResource}
 */
proto.admin_v2.WebResource.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setArchiveDownloadBaseUrl(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCreatePipelineRequestJsonSchemaUrl(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.admin_v2.WebResource.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.admin_v2.WebResource.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.admin_v2.WebResource} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.admin_v2.WebResource.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getArchiveDownloadBaseUrl();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCreatePipelineRequestJsonSchemaUrl();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string archive_download_base_url = 1;
 * @return {string}
 */
proto.admin_v2.WebResource.prototype.getArchiveDownloadBaseUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.admin_v2.WebResource} returns this
 */
proto.admin_v2.WebResource.prototype.setArchiveDownloadBaseUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string create_pipeline_request_json_schema_url = 2;
 * @return {string}
 */
proto.admin_v2.WebResource.prototype.getCreatePipelineRequestJsonSchemaUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.admin_v2.WebResource} returns this
 */
proto.admin_v2.WebResource.prototype.setCreatePipelineRequestJsonSchemaUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


goog.object.extend(exports, proto.admin_v2);
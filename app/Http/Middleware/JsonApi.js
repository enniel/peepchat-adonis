'use strict';

const JsonApiSerializer = require('jsonapi-serializer').Serializer;

function setupSerializer(make, response) {
  return function (serializerName, data, statusCode = 200) {
    const helpers = make('Helpers');

    const { type, serializer } = make(helpers.makeNameSpace('Http/Serializers', serializerName));

    if (data.toJSON && typeof data.toJSON === 'function') {
      data = data.toJSON();
    }

    const json = new JsonApiSerializer(type, serializer).serialize(data);

    response.status(statusCode).json(json);
  };
}

class JsonApi {

  * handle(request, response, next) {
    response.jsonApi = setupSerializer(use, response);

    yield next;
  }

}

module.exports = JsonApi;
exports.handler = (event, context) => {
  try {
    // New Session
    if (event.session.new) {
      console.log("new session has begun")
    }

    switch (event.request.type) {
      // Launch Request
      case "LaunchRequest":
        console.log("LAUNCH REQUEST HAS OCCURRED");
        context.succeed(
          generateResponse(
            buildSpeechletResponse('Welcome to the UC Berkeley Spirit Skill. Go Bears!', true),
            {}
          )
        )
        break;

      // Intent Request
      case "IntentRequest":
        console.log("INTENT REQUEST HAS OCCURRED")

        switch(event.request.intent.name) {
          case "GetBetterSchool":
            console.log(event.request.intent.slots.School.value)
            var s = event.request.intent.slots.School.value
            context.succeed(
              generateResponse(
                buildSpeechletResponse('While ' + s + ' is a great school, Cal is a superior university', true),
                {}
              )
            )
            break;

          case "GetYearFounded":
            context.succeed(
              generateResponse(
                buildSpeechletResponse("Cal was founded on March 23, 1868", true),
                {}
              )
            )
            break;

          case "GetResponseToGo":
            context.succeed(
              generateResponse(
                buildSpeechletResponse("bears", true),
                {}
              )
            )
            break;


        }
      // Session Ended Request
      case "SessionEndedRequest":
        console.log("REQUEST TO END SESSION")
        break;

      default:
        context.fail('INVALID REQUEST TYPE:  ${event.request.type}')
    }
  } catch(error) {
    context.fail('exception: ${error}')
  }
}

// Helper functions
buildSpeechletResponse = (outputText, shouldEndSession) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }
}

generateResponse = (speechletResponse, sessionAttributes) => {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }
}

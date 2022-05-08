const { assert } = require('@japa/assert')
const { apiClient } = require('@japa/api-client')
const { specReporter } = require('@japa/spec-reporter')
const { runFailedTests } = require('@japa/run-failed-tests')


function presetSails() {
    return async function(config, runner, { TestContext }) {
        runner.onSuite((suite) => {
            suite.setup(async () => {
                if(suite.name === 'functional') {
                    const sails  = await startApp({ environment: 'test' })

                    TestContext.macro('route', function(target, routeParams) {
                        let url = sails.getUrlFor(target)
                        if (routeParams) {
                            url = interpolateUrl(url, routeParams)
                            function interpolateUrl(url, replaceMap) {
                                return url.split('/').map(
                                    (part) => part.startsWith(':') ? replaceMap[part.substr(1)] : part
                                ).join('/')
                            }
                        }
                        return url
                    })

                    return  async () => await sails.lower()
                }

                await startApp({ environment: 'test' }, 'load')

            })

        })
    }
}

function startApp(options, method = 'lift') {
    return new Promise((resolve, reject) => {
        const Sails = require('sails').constructor;
        const sails = new Sails();
        sails[method](options, (error, sails) => {
            if (error) {
                reject(error)
            } else {
                resolve(sails)
            }
        })
    })
}
module.exports = {
    presetSails,
    assert,
    apiClient,
    specReporter,
    runFailedTests
}

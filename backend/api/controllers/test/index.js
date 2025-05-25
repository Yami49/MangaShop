module.exports = {
    friendlyName: 'API Test',
  
    description: 'API-Testroute für Frontend.',
  
    exits: {
      success: {
        responseType: 'json',
      },
    },
  
    fn: async function () {
      return {
        message: 'Deine API funktioniert!',
        timestamp: new Date(),
      };
    },
  };
  
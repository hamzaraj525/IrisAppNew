import axios from 'axios';

export const apiChat = async (messageTxt, phone, countryItem, imageAwsUri) => {
  try {
    const response = await axios.post(BASE_URL, {
      content: messageTxt,
      number: '+14802735608',
      'user-agent': 'app',
      media_url: imageAwsUri,
    });

    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

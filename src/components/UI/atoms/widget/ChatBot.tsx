import { SignJWT } from 'jose';
import { useEffect } from 'react';

const CHAINLIT_AUTH_SECRET = import.meta.env.VITE_CHAINLIT_AUTH_SECRET || '';
const COPILOT_SERVER = import.meta.env.VITE_COPILOT_SERVER || '';

interface Metadata {
  [key: string]: any;
}

async function createJwt(identifier: string, metadata: Metadata): Promise<string> {
  const secret = new TextEncoder().encode(CHAINLIT_AUTH_SECRET);

  const token = await new SignJWT({ identifier, metadata })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15d')
    .sign(secret);

  return token;
}

const ChatBot = () => {
  useEffect(() => {
    // Fungsi async untuk setup widget
    const setupWidget = async () => {
      try {
        // Generate access token
        const accessToken = await createJwt('user-1', { name: 'John Doe' });

        // Load the Copilot script dynamically
        const script = document.createElement('script');
        script.src = `${COPILOT_SERVER}/copilot/index.js`;
        script.async = true;

        // After the script loads, mount the Chainlit widget
        script.onload = () => {
          if (window.mountChainlitWidget) {
            window.mountChainlitWidget({
              chainlitServer: COPILOT_SERVER,
              accessToken,
              theme: 'dark',
              button: {
                style: {
                  bgcolor: '#494949',
                  color: '#fff',
                  bgcolorHover: '#FD9E28',
                  boxShadow: '#f0f0f0',
                  size: '45px',
                },
              },
            });
          }
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error('Failed to initialize ChatBot widget:', error);
      }
    };

    setupWidget();

    return () => {
      const script = document.querySelector(`script[src="${COPILOT_SERVER}/copilot/index.js"]`);
      if (script) document.body.removeChild(script); // Clean up script on unmount
    };
  }, []);

  return null;
};

export default ChatBot;
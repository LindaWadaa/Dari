/**
 * Dari AI Assistant
 * Provides information about Dari services and projects.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Knowledge Base
    const dariKnowledge = {
        general: "Dari est une entreprise spécialisée dans la construction, la rénovation et l'aménagement de l'habitat. Nous regroupons tous les métiers du bâtiment (architectes, ingénieurs, maçons, etc.) pour gérer votre projet de A à Z.",
        services: "Nous offrons des services d'architecture, ingénierie, gros œuvre, plomberie, électricité, menuiserie, peinture décorative, climatisation, staff et aménagement paysager.",
        contact: "Vous pouvez nous contacter au +216 96 255 343 ou par email à dari4communication@gmail.com. Nous sommes situés à Béni Khiar, Nabeul.",
        projets: "Nous réalisons des villas modernes, des rénovations d'appartements, des installations solaires et des extensions de maisons. Allez voir notre section 'Nos Réalisations' !",
        equipe: "Dari rassemble une équipe intégrée d'experts pour éviter la gestion de multiples intervenants et garantir un résultat cohérent.",
        devis: "Vous pouvez demander un devis en cliquant sur le bouton 'Demande de devis' dans la section collaboration ou en nous contactant directement."
    };

    // UI Elements
    const body = document.body;

    // Create HTML Structure
    const assistantHTML = `
        <div id="ai-assistant-container">
            <div id="ai-chat-window" class="chat-closed">
                <div class="chat-header">
                    <img src="assets/img/bb-removebg-preview.png" alt="Dari AI">
                    <span>Assistant Dari</span>
                    <button id="close-chat">&times;</button>
                </div>
                <div id="chat-messages">
                    <div class="message bot">Bonjour ! Comment puis-je vous aider aujourd'hui ? Je peux vous parler de nos services, de nos projets ou de la façon de nous contacter.</div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Posez votre question...">
                    <button id="send-btn"><i class='bx bxs-send'></i></button>
                </div>
            </div>
            <div id="ai-trigger-btn" title="Besoin d'aide ?">
                <img src="assets/img/bb-removebg-preview.png" alt="AI">
            </div>
        </div>
    `;

    body.insertAdjacentHTML('beforeend', assistantHTML);

    const triggerBtn = document.getElementById('ai-trigger-btn');
    const chatWindow = document.getElementById('ai-chat-window');
    const closeBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');

    // Reset chat on load (already handled by not using localStorage)

    // Toggle Chat
    triggerBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('chat-open');
        chatWindow.classList.toggle('chat-closed');
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.add('chat-closed');
        chatWindow.classList.remove('chat-open');
    });

    // Send Message Logic
    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user');
        chatInput.value = '';

        // Bot Response
        setTimeout(() => {
            const response = getBotResponse(text);
            addMessage(response, 'bot');
        }, 600);
    };

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerText = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    const getBotResponse = (input) => {
        const query = input.toLowerCase();

        if (query.includes('service') || query.includes('faire') || query.includes('métier')) return dariKnowledge.services;
        if (query.includes('contact') || query.includes('appel') || query.includes('adresse') || query.includes('mail')) return dariKnowledge.contact;
        if (query.includes('projet') || query.includes('réalisation') || query.includes('travaux')) return dariKnowledge.projets;
        if (query.includes('qui') || query.includes('dari') || query.includes('entreprise')) return dariKnowledge.general;
        if (query.includes('équipe') || query.includes('expert') || query.includes('membre')) return dariKnowledge.equipe;
        if (query.includes('devis') || query.includes('prix') || query.includes('combien')) return dariKnowledge.devis;
        if (query.includes('bonjour') || query.includes('salut')) return "Bonjour ! Je suis l'assistant virtuel de Dari. Posez-moi une question sur nos services de construction et rénovation.";

        return "Désolé, je n'ai pas compris. Vous pouvez me poser des questions sur nos services, nos projets ou comment nous contacter !";
    };

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});

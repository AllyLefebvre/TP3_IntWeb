document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const inputs = {
        nom: document.getElementById('nom'),
        email: document.getElementById('email'),
        titre: document.getElementById('titre'),
        categorie: document.getElementById('categorie'),
        source: document.getElementById('source'),
        fiabilite: document.getElementById('fiabilite'),
        anecdote: document.getElementById('anecdote')
    };

    function createErrorMessage(input, message) {
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-400 text-sm mt-1';
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
        
        input.classList.remove('border-purple-500');
        input.classList.add('border-red-500');
    }

    function removeErrorMessage(input) {
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        
        input.classList.remove('border-red-500');
        input.classList.add('border-purple-500');
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateUrl(url) {
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return urlRegex.test(url);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;

        Object.values(inputs).forEach(input => {
            removeErrorMessage(input);
        });

        const nom = inputs.nom.value.trim();
        if (nom === '') {
            createErrorMessage(inputs.nom, 'Le champ ne peut pas être vide');
            isFormValid = false;
        }

        const email = inputs.email.value.trim();
        if (email === '') {
            createErrorMessage(inputs.email, 'Le champ ne peut pas être vide');
            isFormValid = false;
        } else if (!validateEmail(email)) {
            createErrorMessage(inputs.email, 'Email invalide');
            isFormValid = false;
        }

        const titre = inputs.titre.value.trim();
        if (titre === '') {
            createErrorMessage(inputs.titre, 'Le champ ne peut pas être vide');
            isFormValid = false;
        }

        const categorie = inputs.categorie.value.trim();
        if (categorie === '') {
            createErrorMessage(inputs.categorie, 'Le champ ne peut pas être vide');
            isFormValid = false;
        }

        const source = inputs.source.value.trim();
        if (source === '') {
            createErrorMessage(inputs.source, 'Le champ ne peut pas être vide');
            isFormValid = false;
        } else if (!validateUrl(source)) {
            createErrorMessage(inputs.source, 'Veuillez entrer un lien web valide');
            isFormValid = false;
        }

        const fiabilite = inputs.fiabilite.value.trim();
        if (fiabilite === '') {
            createErrorMessage(inputs.fiabilite, 'Le champ ne peut pas être vide');
            isFormValid = false;
        }

        const anecdote = inputs.anecdote.value.trim();
        if (anecdote === '') {
            createErrorMessage(inputs.anecdote, 'Le champ ne peut pas être vide');
            isFormValid = false;
        }

        if (isFormValid) {
            showLoadingSpinner();
            console.log('Formulaire valide !');
            
            setTimeout(() => {
                hideLoadingSpinner();
                showSuccessMessage();
            }, 2000);
        } else {
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    function showLoadingSpinner() {
        const submitButton = document.querySelector('button[type="submit"]');
        const originalContent = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            Envoi en cours...
        `;
        
        submitButton.dataset.originalContent = originalContent;
    }

    function hideLoadingSpinner() {
        const submitButton = document.querySelector('button[type="submit"]');
        
        submitButton.disabled = false;
        submitButton.innerHTML = submitButton.dataset.originalContent;
    }

    function showSuccessMessage() {
        const existingSuccess = document.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }

        const successDiv = document.createElement('div');
        successDiv.className = 'success-message bg-green-900 border-l-4 border-green-500 p-4 rounded mt-6';
        successDiv.innerHTML = `
            <div class="flex items-center">
                <span class="material-icons text-green-400 mr-2">check_circle</span>
                <div>
                    <h4 class="text-green-100 font-bold">Anecdote envoyée avec succès !</h4>
                    <p class="text-green-200 text-sm mt-1">Merci pour votre contribution.</p>
                </div>
            </div>
        `;

        form.parentNode.appendChild(successDiv);

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
});

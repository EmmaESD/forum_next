export function validatePassword(password: string): { valid: boolean; error?: string } {
    if (password.length < 8) {
        return {
            valid: false,
            error: "Le mot de passe doit contenir au moins 8 caractères"
        };
    }

    if (password.length > 128) {
        return {
            valid: false,
            error: "Le mot de passe ne peut pas dépasser 128 caractères"
        };
    }

    // Optionnel : vérifier la présence de chiffres
    if (!/\d/.test(password)) {
        return {
            valid: false,
            error: "Le mot de passe doit contenir au moins un chiffre"
        };
    }

    // Optionnel : vérifier la présence de lettres majuscules
    if (!/[A-Z]/.test(password)) {
        return {
            valid: false,
            error: "Le mot de passe doit contenir au moins une lettre majuscule"
        };
    }

    // Optionnel : vérifier la présence de caractères spéciaux
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return {
            valid: false,
            error: "Le mot de passe doit contenir au moins un caractère spécial"
        };
    }

    return { valid: true };
}

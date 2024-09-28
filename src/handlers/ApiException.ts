export class ApiException extends Error {
    public message: string;
    public status: number;
    public isFuntional: boolean;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.message = message;
        this.isFuntional = true;
    }

    // Método para convertir la excepción en una respuesta JSON estándar
    toResponse() {
        return {
            message: this.message
        };
    }
}

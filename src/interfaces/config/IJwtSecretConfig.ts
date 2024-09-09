export default interface JwtSecretConfig {
    secret: string | undefined;
    header: string | undefined;
    headers: string | undefined;
    expires: string | undefined;
    refresh: string | undefined;
}

export const resetPasswordTemplate = (token: string) => {
	return `<h1>Witaj,</h1>
		<h2>Kliknij przycisk, aby zresetować hasło do konta E-ZAMOWIENIA.</h2>
		<a href="http://127.0.0.1:8080/resetowanie-hasla/${token}" style="background-color: blue; color: white; padding: 8px; border-radius: 8px; text-decoration: unset;">ZRESETUJ HASŁO</button>`
}
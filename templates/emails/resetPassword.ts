export const resetPasswordTemplate = (token: string) => {
	return `<h1>Witaj,</h1>
		<h2>Kliknij przycisk, aby zresetować hasło do konta E-ZAMOWIENIA.</h2>
		<a href="http://localhost:8080/passwordReset/${token}" style="background-color: blue; color: white; padding: 8px; border-radius: 8px; text-decoration: unset;">ZRESETUJ HASŁO</button>`
}
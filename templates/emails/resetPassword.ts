export const resetPasswordTemplate = (token: string) => {
	return `<h1>Witaj,</h1>
		<h2>Kliknij przycisk, aby zresetować hasło do konta E-ZAMOWIENIA.</h2>
		<a href="https://e-zamowienia.onrender.com/${token}" target="_blank" style="background-color: blue; color: white; padding: 8px; border-radius: 8px; text-decoration: unset;">ZRESETUJ HASŁO</button>`
}
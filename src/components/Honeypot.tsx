/**
 * Campo isca anti-bot. Fica fora da tela e fora da navegação por teclado,
 * então pessoa nenhuma preenche. Robô de spam preenche tudo que encontra,
 * e aí a API descarta o envio em silêncio (ver src/lib/guard.ts).
 */
export default function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Não preencha este campo
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

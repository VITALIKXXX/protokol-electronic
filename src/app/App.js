import { ProtocolForm } from "../features/protocols/ProtocolForm";
import { AppShell, Header, Title, Subtitle, Main } from "./App.styles";

const App = () => {
  return (
    <AppShell>
      <Header>
        <Title>Protokół elektroniczny</Title>
        <Subtitle>Formularz wykonania usługi</Subtitle>
      </Header>

      <Main>
        <ProtocolForm />
      </Main>
    </AppShell>
  );
};

export default App;
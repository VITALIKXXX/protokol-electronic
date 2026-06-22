import { useEffect, useState } from "react";
import { ProtocolForm } from "../features/protocols/ProtocolForm";
import { ProtocolList } from "../features/protocols/ProtocolList";
import { subscribeProtocols } from "../features/protocols/protocolsApi";
import { AppShell, Header, Title, Subtitle, Main } from "./App.styles";

const App = () => {
  const [protocols, setProtocols] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeProtocols(setProtocols);

    return () => unsubscribe();
  }, []);

  return (
    <AppShell>
      <Header>
        <Title>Protokół elektroniczny</Title>
        <Subtitle>Formularz wykonania usługi</Subtitle>
      </Header>

      <Main>
        <ProtocolForm />
        <ProtocolList protocols={protocols} />
      </Main>
    </AppShell>
  );
};

export default App;
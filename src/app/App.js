import { useEffect, useState } from "react";
import { ProtocolForm } from "../features/protocols/ProtocolForm";
import { ProtocolList } from "../features/protocols/ProtocolList";
import { subscribeProtocols } from "../features/protocols/protocolsApi";
import { AppShell, Header, Title, Subtitle, Main } from "./App.styles";
import { ProtocolDetails } from "../features/protocols/ProtocolDetails";
import { removeProtocol } from "../features/protocols/protocolsApi";

const App = () => {
  const [protocols, setProtocols] = useState([]);

  const [selectedProtocol, setSelectedProtocol] = useState(null);

  const [editingProtocol, setEditingProtocol] = useState(null);

  const [query, setQuery] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeProtocols(setProtocols);

    return () => unsubscribe();
  }, []);

  const handleDeleteProtocol = async (id) => {
    const ok = window.confirm("Na pewno usunąć ten protokół?");
    if (!ok) return;

    await removeProtocol(id);

    if (selectedProtocol?.id === id) {
      setSelectedProtocol(null);
    }
  };

  const filteredProtocols = protocols.filter((protocol) => {
    const q = query.trim().toLowerCase();

    if (!q) return true;

    return (
      String(protocol.protocolNumber || "").toLowerCase().includes(q) ||
      String(protocol.breeder || "").toLowerCase().includes(q) ||
      String(protocol.executionDate || "").toLowerCase().includes(q)
    );
  });

  return (
    <AppShell>
      <Header>
        <Title>Protokół elektroniczny</Title>
        <Subtitle>Formularz wykonania usługi</Subtitle>
      </Header>

      <Main>
        <ProtocolForm
          editingProtocol={editingProtocol}
          onFinishEdit={() => setEditingProtocol(null)}
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Szukaj protokołu..."
        />
        <ProtocolList
          protocols={filteredProtocols}
          onSelect={setSelectedProtocol}
        />
        <ProtocolDetails
          protocol={selectedProtocol}
          onDelete={handleDeleteProtocol}
          onEdit={setEditingProtocol}
        />
      </Main>
    </AppShell>
  );
};

export default App;
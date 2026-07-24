import { useEffect, useState } from "react";
import { ProtocolForm } from "../features/protocols/ProtocolForm";
import { ProtocolList } from "../features/protocols/ProtocolList";
import { subscribeProtocols } from "../features/protocols/protocolsApi";
import { AppShell, Header, Title, Subtitle, Main, SearchWrapper, SearchIcon, SearchInput } from "./App.styles";
import { removeProtocol } from "../features/protocols/protocolsApi";
import { NetworkStatus } from "../features/network/NetworkStatus";

const App = ({
  currentUser,
  currentUserData,
  role,
}) => {
  const [protocols, setProtocols] = useState([]);

  const [selectedProtocol, setSelectedProtocol] = useState(null);

  const [editingProtocol, setEditingProtocol] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeProtocols(setProtocols);

    return () => unsubscribe();
  }, []);

  const handleDeleteProtocol = async (id) => {
    if (role !== "admin") {
      alert("Tylko administrator może usuwać protokoły.");
      return;
    }

    const confirmed = window.confirm(
      "Na pewno usunąć ten protokół?"
    );

    if (!confirmed) return;

    await removeProtocol(id);

    if (selectedProtocol?.id === id) {
      setSelectedProtocol(null);
    }
  };

  const filteredProtocols = protocols.filter((protocol) => {
    const q = search.trim().toLowerCase();

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
        <NetworkStatus />
      </Header>

      <Main>
        <ProtocolForm
          editingProtocol={editingProtocol}
          onFinishEdit={() => setEditingProtocol(null)}
          currentUser={currentUser}
          currentUserData={currentUserData}
        />
        <SearchWrapper>
          <SearchIcon>🔍</SearchIcon>

          <SearchInput
            placeholder="Szukaj protokołu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchWrapper>
        <ProtocolList
          protocols={filteredProtocols}
          onEdit={setEditingProtocol}
          onDelete={handleDeleteProtocol}
          role={role}
        />
      </Main>
    </AppShell>
  );
};

export default App;
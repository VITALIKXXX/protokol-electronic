import { useEffect, useState } from "react";

import { ProtocolForm } from "../features/protocols/ProtocolForm";
import { ProtocolList } from "../features/protocols/ProtocolList";

import {
  subscribeProtocols,
  removeProtocol,
  finalizePendingProtocolNumbers,
} from "../features/protocols/protocolsApi";

import {
  AppShell,
  Header,
  Title,
  Subtitle,
  Main,
  SearchWrapper,
  SearchIcon,
  SearchInput,
} from "./App.styles";

import { NetworkStatus } from "../features/network/NetworkStatus";
import { AppUpdateBanner } from "../features/update/AppUpdateBanner";


const App = ({
  currentUser,
  currentUserData,
  role,
}) => {
  const [protocols, setProtocols] = useState([]);

  const [selectedProtocol, setSelectedProtocol] = useState(null);

  const [editingProtocol, setEditingProtocol] = useState(null);

  const [search, setSearch] = useState("");


  // =====================================================
  // NASŁUCHIWANIE PROTOKOŁÓW
  // =====================================================

  useEffect(() => {
    const unsubscribe = subscribeProtocols(setProtocols);

    return () => unsubscribe();
  }, []);


  // =====================================================
  // SYNCHRONIZACJA NUMERÓW PROTOKOŁÓW
  //
  // Jeżeli protokół został utworzony offline,
  // posiada numer TEMP-...
  //
  // Kiedy internet wróci, aplikacja automatycznie
  // nada mu właściwy numer, np. 047/2026.
  // =====================================================

  useEffect(() => {
    const synchronizeProtocolNumbers = async () => {
      if (!navigator.onLine) {
        return;
      }

      try {
        await finalizePendingProtocolNumbers();

        console.log(
          "Synchronizacja numerów protokołów zakończona."
        );
      } catch (error) {
        console.error(
          "Błąd synchronizacji numerów protokołów:",
          error
        );
      }
    };


    // Sprawdzamy przy uruchomieniu aplikacji.
    synchronizeProtocolNumbers();


    // Sprawdzamy ponownie, kiedy telefon odzyska internet.
    window.addEventListener(
      "online",
      synchronizeProtocolNumbers
    );


    return () => {
      window.removeEventListener(
        "online",
        synchronizeProtocolNumbers
      );
    };
  }, []);


  // =====================================================
  // USUWANIE PROTOKOŁU
  // =====================================================

  const handleDeleteProtocol = async (id) => {
    if (role !== "admin") {
      alert(
        "Tylko administrator może usuwać protokoły."
      );

      return;
    }

    const confirmed = window.confirm(
      "Na pewno usunąć ten protokół?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await removeProtocol(id);

      if (selectedProtocol?.id === id) {
        setSelectedProtocol(null);
      }
    } catch (error) {
      console.error(
        "Błąd usuwania protokołu:",
        error
      );

      alert(
        "Nie udało się usunąć protokołu."
      );
    }
  };


  // =====================================================
  // WYSZUKIWANIE
  // =====================================================

  const filteredProtocols = protocols.filter(
    (protocol) => {
      const q = search
        .trim()
        .toLowerCase();

      if (!q) {
        return true;
      }

      return (
        String(
          protocol.protocolNumber || ""
        )
          .toLowerCase()
          .includes(q) ||

        String(
          protocol.breeder || ""
        )
          .toLowerCase()
          .includes(q) ||

        String(
          protocol.executionDate || ""
        )
          .toLowerCase()
          .includes(q)
      );
    }
  );


  return (
    <>
      <AppUpdateBanner />

      <AppShell>
        <Header>
          <Title>
            Protokół elektroniczny
          </Title>

          <Subtitle>
            Formularz wykonania usługi
          </Subtitle>

          <NetworkStatus />
        </Header>


        <Main>
          <ProtocolForm
            editingProtocol={editingProtocol}
            onFinishEdit={() =>
              setEditingProtocol(null)
            }
            currentUser={currentUser}
            currentUserData={currentUserData}
          />


          <SearchWrapper>
            <SearchIcon>
              🔍
            </SearchIcon>

            <SearchInput
              placeholder="Szukaj protokołu..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
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
    </>
  );
};


export default App;
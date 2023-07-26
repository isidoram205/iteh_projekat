import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";
import { Container, Box } from "@pankod/refine-mui";

import { tasteOfBelgrade } from '../assets';
import { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {
  //definisemo funkciju useLogin() koja poziva funkciju mutate koja se kosristi za 
  //proveru kredincijala korisnika pre prijave na server.
  //prijava se vrsi klikom na google dugme.
  const { mutate: login } = useLogin<CredentialResponse>();

  //Komponenta GoogleButton predstavlja Google dugme za prijavu
  const GoogleButton = (): JSX.Element => {
    //useRef() React hook da bi se dobio referenca na HTML div element u kome će se prikazati Google dugme. 
    const divRef = useRef<HTMLDivElement>(null);
    //useEffect() React hook se koristi za inicijalizaciju Google API-ja i prikazivanje Google dugmeta
    useEffect(() => {

      //proveravamo da li se desava na serveru ili u pregledacu, i ako nijedan nije ispunjen
      //prekida se dalje izvrsavanje
      //to je jer bi se izbegle greške u Node.js okruženju (na serveru) gde window objekat 
      //nije definisan i nema smisla inicijalizovati Google API-je ili prikazivati Google dugme. 
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        // Ova funkcija se izvršava samo jednom, kada se komponenta učita.
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          //callback funkcija koja će se izvršiti kada korisnik uspešno prijavi 
          //se na Google nalog. Callback funkcija poziva login() funkciju, koja se 
          //dobija iz useLogin() funkcije, sa CredentialResponse objektom koji predstavlja kredencijale korisnika.
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        //izgled Google button-a, gde se prikazuje samo ikonica google
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "outline",
          size: "large",
          type: "icon",
        });
        //Ako je Login neuspesan, ispisuje se greska
      } catch (error) {
        console.log(error);
      }
    }, []); 

    return <div ref={divRef} />;
  };

  return (
    <Box 
    //dodajemo pozadinu na login formi koja je slika i stavljamo da ima maksimalnu
    //duzinu i sirinu
      component="div"
      sx={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/005/140/844/large_2x/brown-wooden-table-on-coffee-shop-or-restaurant-background-free-photo.jpg')`,
        width: '100vw', 
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
        //definisemo izgled login forme da ima pozadinu i padding
        //dodajemo da ona sadrzi naziv veb aplikacije i dugme za login
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: 'white',
            padding: '25px',
            paddingBottom: '40px',
            paddingTop: '40px',
            opacity: '85%',
            borderRadius: '25%'
          }}
        >
          <div>
            <img src={tasteOfBelgrade} alt=" of Belgrade Logo" />
          </div>
          <Box mt={4}>
            <GoogleButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

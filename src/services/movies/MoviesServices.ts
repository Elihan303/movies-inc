import { IMoviesServices } from "./types";
import { APIMovies } from "../API";

export class MoviesServices implements IMoviesServices {
  ObtenerPeliculasEnReproduccion(): Promise<any> {
    const prome = new Promise<any>((resolve, reject) => {
      APIMovies.get("/movie/now_playing")
        .then((res: any) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
    return prome;
  }
  ObtenerPeliculaPorId(id: number): Promise<any> {
    const prome = new Promise<any>((resolve, reject) => {
      APIMovies.get("/movie/" + id)
        .then((res: any) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
    return prome;
  }
  ObtenerCastPelicula(id: number): Promise<any> {
    const prome = new Promise<any>((resolve, reject) => {
      APIMovies.get("/movie/" + id + "/credits")
        .then((res: any) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
    return prome;
  }

  PostCalificacion(id: number, data: any, session_id: string): Promise<any> {
    const prome = new Promise<any>((resolve, reject) => {
      APIMovies.post("/movie/" + id + "/rating", data, {
        params: {
          guest_session_id: session_id,
        },
      })
        .then((res: any) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
    return prome;
  }
  CrearSesionInvitado(): Promise<any> {
    const prome = new Promise<any>((resolve, reject) => {
      APIMovies.get("/authentication/guest_session/new")
        .then((res: any) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
    return prome;
  }

  ObtenerCalificacionPelicula(guest_session_id: any): Promise<any> {
    const prome = new Promise<any>((resolve, reject) => {
      APIMovies.get(`/guest_session/${guest_session_id}/rated/movies`, {
        params: {
          sort_by: "created_at.asc",
        },
      })
        .then((res: any) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
    return prome;
  }
}

const Movies = new MoviesServices();
export default Movies;

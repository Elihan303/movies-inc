export interface IMoviesServices {
  ObtenerPeliculasEnReproduccion(): Promise<any>;
  ObtenerPeliculaPorId(id: number): Promise<any>;
  ObtenerCastPelicula(id: number): Promise<any>;
  PostCalificacion(id: number, data: any, session_id: string): Promise<any>;
  CrearSesionInvitado(): Promise<any>;
  ObtenerCalificacionPelicula(guest_session_id: any): Promise<any>;
}

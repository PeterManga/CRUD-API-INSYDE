import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/Home/Home';
import {FilesPage} from '../pages/Files/Files';
import { FileDetailsPage } from '../pages/Files/filesDetails/FilesDetails';
import { PlaylistPage } from '../pages/Playlists/Playlist';
import { PlaylistDetaillsPage } from '../pages/Playlists/playlistDetaills/PlaylistDetaillsPage';
import { AddPlaylist } from '../pages/Playlists/addPlaylist/AddPlaylist';
import { Login } from '../pages/login/Login';
import { CalendarPage } from '../pages/calendar/Calendar';
import { AddFiles } from '../pages/Files/addFile/AddFile';
import { PlayerPage } from '../pages/Player/Player';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/files" element={<FilesPage />} />
      <Route path="/addfile" element={<AddFiles />}/>
      <Route path='/files/:id' element={<FileDetailsPage/>}/>
      <Route path='/playlist' element={<PlaylistPage/>}/>
      <Route path='/playlist/:id' element={<PlaylistDetaillsPage/>}/>
      <Route path="/addPlaylist" element={<AddPlaylist/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/calendar/:id" element={<CalendarPage/>} />
      <Route path="/player" element={<PlayerPage/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

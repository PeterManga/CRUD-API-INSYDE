import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/Home/Home';
import {FilesPage} from '../pages/Files/Files'
import { FileDetailsPage } from '../pages/Files/filesDetails/FilesDetails';
import { PlaylistPage } from '../pages/Playlists/Playlist';
import { AddFiles } from '../pages/Files/addFile/AddFile';
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/files" element={<FilesPage />} />
      <Route path="/addFile" element={<AddFiles />} />
      <Route path='/files/:id' element={<FileDetailsPage/>}/>
      <Route path='/playlist' element={<PlaylistPage/>}/>
      <Route path='/playlist/:id' element={<PlaylistPage/>}/>
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
};

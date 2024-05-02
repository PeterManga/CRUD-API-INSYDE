import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/Home/Home';
import { AddFiles } from '../pages/Files/addFile/AddFile';
import {FilesPage} from '../pages/Files/Files'
import { FileDetailsPage } from '../pages/Files/filesDetails/FilesDetails';
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/files" element={<FilesPage />} />
      <Route path="/addFile" element={<AddFiles />} />
      <Route path='/files/:id' element={<FileDetailsPage/>}/>
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
};

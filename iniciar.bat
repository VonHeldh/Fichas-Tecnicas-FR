@echo off
title Sistema de Fichas Tecnicas PRO
echo ========================================================
echo   INICIANDO SISTEMA DE FICHAS TECNICAS MINIMALISTAS
echo ========================================================
echo.
echo Abrindo servidor local e navegador...
echo.

start "" "http://127.0.0.1:5173"
call npm.cmd run dev -- --host 127.0.0.1 --port 5173
pause

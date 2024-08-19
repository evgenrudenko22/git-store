// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
// use tauri::State;
use serde::{ Deserialize};

#[derive(Debug, Deserialize)]
struct BranchRequest {
    name: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn list_branches() -> Result<String, String> {
    let output = Command::new("git")
        .arg("branch")
        .output()
        .map_err(|e| format!("Failed to list branches: {}", e))?;

    let branches = String::from_utf8_lossy(&output.stdout).to_string();
    Ok(branches)
}

#[tauri::command]
fn create_branch(branch: BranchRequest) -> Result<String, String> {
    let output = Command::new("git")
        .arg("checkout")
        .arg("-b")
        .arg(&branch.name)
        .output()
        .map_err(|err| format!("Failed to create branch: {}", err))?;

    if output.status.success() {
        Ok(format!("Branch {} created", branch.name))
    } else {
        Err("Failed to create branch".to_string())
    }
}

#[tauri::command]
fn list_commits(branch: String) -> Result<String, String> {
    Command::new("git")
        .arg("checkout")
        .arg(&branch)
        .output()
        .map_err(|err| format!("Failed to checkout branch: {}", err))?;

    let output = Command::new("git")
        .arg("log")
        .output()
        .map_err(|err| format!("Failed to list commits: {}", err))?;

    let commits = String::from_utf8_lossy(&output.stdout).to_string();
    Ok(commits)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            list_branches,
            create_branch,
            list_commits
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

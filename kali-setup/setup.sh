#!/bin/bash

# Add Brave Browser Sources
# Brave Browser
echo "Installing Vivaldi"
wget -O /tmp/vivaldi.deb 'https://downloads.vivaldi.com/stable/vivaldi-stable_6.2.3105.43-1_amd64.deb'
sudo dpkg -i /tmp/vivaldi.deb
rm /tmp/vivaldi.deb

# Update and add necessary packages
echo "Installing Packages"
sudo apt update
sudo apt install -y fish terminator gedit python3-pip vim-gtk3 zaproxy vivaldi-stable

# Install VSCode
echo "Installing VSCode"
wget "https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64" -O /tmp/code.deb
sudo dpkg -i /tmp/code.deb
rm /tmp/code.deb

# Setup Rust and Rust tools
echo "Installing Rust and Rust tools"
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | bash -s -- -y
~/.cargo/bin/cargo install rustscan
~/.cargo/bin/cargo install feroxbuster

# Setup fonts and Seclists
echo "Creating Scripts folder"
mkdir ~/Scripts
echo "Downloading SecLists"
git clone https://github.com/danielmiessler/SecLists ~/Scripts/SecLists
echo "Downloading NerdFont"
wget -O /tmp/scp.zip https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/SourceCodePro.zip
echo "Installing NerdFont"
unzip /tmp/scp.zip -d /tmp/scp '*.ttf'
sudo mkdir /usr/share/fonts/saucecode-pro
sudo mv /tmp/scp/*.ttf /usr/share/fonts/saucecode-pro
rm -rf /tmp/scp
sudo fc-cache -s -f

# Setup Terminator
echo "Setting up Terminator"
mkdir ~/.config/terminator
cp ./terminatorconfig ~/.config/terminator/config

# Setup Shell
# Installing Starship
echo "Setting up shell"
curl -sS https://starship.rs/install.sh | sh
if [ ! -d ~/.config/fish ]; then
	mkdir ~/.config/fish/
fi
# Add TTI Theme
cp ./starship.toml ~/.config/starship.toml

# Add Fish files
mkdir ~/.config/fish
cp ./config.fish ~/.config/fish/
cp ./fish_variables ~/.config/fish/

echo "Setup is complete! If you wish to use fish, run:\nchsh -s /usr/bin/fish"

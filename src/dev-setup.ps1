# Install chocolatey or upgrade
if (-not (choco))
{
    iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    RefreshEnv.cmd
}
else
{
    cup chocolatey -y
}

# Check if docker is available
if (-not (docker --version))
{
    throw "Docker is not installed. Install Docker from https://www.docker.com/community-edition#/download"
}

# install azure cli 2.0
cup azure-cli -y

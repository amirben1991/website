$ErrorActionPreference = 'Stop'
$gcloud = 'C:\Users\PrinceDev\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd'
$script = @'
set -e
cd /opt/portfolio
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} + 2>/dev/null || true
# Keep the tarball location and extract the fresh app into place
cd /opt
rm -f /tmp/website_deploy.tar 2>/dev/null || true
# If the tarball is not found on the VM, abort clearly
if [ ! -f /tmp/website_deploy.tar ]; then
  echo 'Missing /tmp/website_deploy.tar on VM'
  exit 1
fi
cd /opt/portfolio
# Recreate the app from the latest archive
rm -rf /opt/portfolio/* /opt/portfolio/.[!.]* /opt/portfolio/..?* 2>/dev/null || true
tar -xf /tmp/website_deploy.tar -C /opt/portfolio
cd /opt/portfolio
# Rebuild only the frontend image to ensure the browser bundle matches localhost
# and recreate it without stale cached files
/usr/local/bin/docker compose build --no-cache frontend
/usr/local/bin/docker compose up -d --force-recreate frontend
/usr/local/bin/docker compose ps
'@
& $gcloud compute ssh portfolio-vm --project mypersonalwebsite-508018 --zone=us-central1-a --command="bash -lc '$script'"

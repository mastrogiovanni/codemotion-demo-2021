# Minikube

## Install minikube

https://minikube.sigs.k8s.io/docs/start/

## Start minikube

`minikube start`

## Enable ingress: 

`minikube addons enable ingress`
# Install ArgoCD

```bash
kubectl create namespace argocd

kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

watch kubectl get pods -n argocd
```

## Expose Argo

`kubectl port-forward svc/argocd-server -n argocd 8080:443`

Access to Argo using username admin and as password the result of the following:

`kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d`

You can access at ArgoCD: [http://localhost:8080](http://localhost:8080)
# Install Prometheus/Grafana stack

[Resource](https://computingforgeeks.com/setup-prometheus-and-grafana-on-kubernetes/)

```bash
git clone https://github.com/prometheus-operator/kube-prometheus.git

cd kube-prometheus

kubectl create -f manifests/setup

kubectl create -f manifests/
```

## Expose prometheus, grafana, alert manager

```bash
kubectl --namespace monitoring port-forward svc/grafana 3000

kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090

kubectl --namespace monitoring port-forward svc/alertmanager-main 9093
```

# Deploy Aplication

In Argo, create an application named guestbook using GIT URL `https://github.com/mastrogiovanni/codemotion-demo-2021.git` directory *kubernetes* and namespace *monitoring*.

## Access to Application

Exlore the ingress host via:

`kubectl get ingress -n monitoring`

You should see something like 

```
NAME                CLASS    HOSTS            ADDRESS        PORTS   AGE
guestbook-ingress   <none>   guestbook.info   192.168.67.2   80      10m
```

You need to add to your /etc/hosts a line

```
192.168.67.2    guestbook.info
```

After that you will:
- reach application at http://guestbook.info
- API at http://guestbook.info/api/hello
- Backend prometheus metrics: http://guestbook.info/metrics

# Grafana

You can monitor your application using as filter the following:

```
service="guestbook-backend"
```

A metrics is for example a Timeline with the following:

`avg(rate(http_request_duration_seconds_sum{service="guestbook-backend"}[1m])) * 1000`

# Local development

Expose main ingress on local port 8888 of host machine

`kubectl --namespace ingress-nginx port-forward svc/ingress-nginx-controller 8888:80`

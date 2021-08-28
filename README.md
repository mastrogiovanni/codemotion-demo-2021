# Minikube

- Install minikube
- Enable ingress: minikube plugins enable ingress
# Install Argo

```
kubectl create namespace argocd

kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

watch kubectl get pods -n argocd

kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

kubectl port-forward svc/argocd-server -n argocd 8080:443
```

# Install Prometheus/Grafana stack

From: https://computingforgeeks.com/setup-prometheus-and-grafana-on-kubernetes/:

```bash
git clone https://github.com/prometheus-operator/kube-prometheus.git

cd kube-prometheus

kubectl create -f manifests/setup

kubectl create -f manifests/

kubectl --namespace monitoring port-forward svc/grafana 3000

kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090

kubectl --namespace monitoring port-forward svc/alertmanager-main 9093

```

# Aplication

Application is at: git@github.com:mastrogiovanni/codemotion-meetup-06-02-2020.git directory kubernetes

# Access to Application

Exlore the ingress host via:

kubectl get ingress -n guestbook

You should see something like 

```
NAME                CLASS    HOSTS            ADDRESS        PORTS   AGE
guestbook-ingress   <none>   guestbook.info   192.168.67.2   80      10m
```

You need to add to your /etc/hosts a line

```
192.168.67.2    guestbook.info
```

After that you will reach application at guestbook.info and API at guestbook.info/api


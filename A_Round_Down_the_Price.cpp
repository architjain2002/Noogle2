#include<bits/stdc++.h>
#include<iostream>
using namespace std;
typedef long long int ll;
void solve(){
   string str;
   cin>>str;
   ll sum=str[0]-'1'
   for(int i=1;i<str.size();i++){
        sum=sum*10+str[i]-'0';
   }
   cout<<sum<<endl;
}
int main(){
    int t;
    cin>>t;
    while(t--){
        solve();
    }
}